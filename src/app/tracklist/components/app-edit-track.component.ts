import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import {
  AppFocusService, AppFormService, FormErrorFeedbackComponent, FormErrorHeaderComponent,
  FormInputNumberComponent, FormInputSelectComponent, FormInputTextComponent, FormLabelComponent, PageHeaderComponent, SpinnerComponent
} from 'js-shared';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppTrackService } from '../../services/app-track.service';
import { AppTrack, TrackBuilder } from '../app-track';
import { AppTrackHelper } from '../util/app-track-helper';
import { AppTracklistMessages } from '../util/app-tracklist-messages';

const ADD_TRACK_TITLE : string = 'Add track';
const EDIT_TRACK_TITLE : string = 'Edit track';
const UNKNOWN_TRACK : string = 'ID';
const BPM_PATTERN : RegExp = /^[0-9]{0,3}$/;

interface TrackForm {
  trackArtist: FormControl<string>;
  trackTitle: FormControl<string>;
  trackBPM: FormControl<number>;
  trackKey: FormControl<string>;
  trackStartTime: FormGroup<TrackTimeForm>;
  trackEndTime: FormGroup<TrackTimeForm>;
}

interface TrackTimeForm {
  trackHours: FormControl<number>;
  trackMinutes: FormControl<number>;
  trackSeconds: FormControl<number>;
}

@Component({
  imports: [
    CommonModule,
    FormErrorFeedbackComponent,
    FormErrorHeaderComponent,
    FormLabelComponent,
    FormInputNumberComponent,
    FormInputSelectComponent,
    FormInputTextComponent,
    PageHeaderComponent,
    ReactiveFormsModule,
    SpinnerComponent
  ],
  selector: 'app-edit-track',
  standalone: true,
  templateUrl: './app-edit-track.component.html'
})
export class AppEditTrackComponent implements OnInit {
  public trackIsLoading : boolean;
  public trackIsUpdating : boolean;
  public trackForm : FormGroup<TrackForm>;
  public track : Observable<AppTrack>;
  private trackEnd : Subject<void>;

  public minorKeys : string[] = ['Ab','Eb','Bb','F','C','G','D','A','E','B','F#','Db'];
  public majorKeys : string[] = ['B','F#','Db','Ab','Eb','Bb','F','C','G','D','A','E'];

  public trackErrorMessage : string;

  public tracklistId : string;
  public trackId : string;

  public trackFormTitle : string;

  public errorMessageBPM : {[key: string]: string} = {
    'pattern' : 'Error: Track BPM is invalid.',
  };

  public errorMessageHours : {[key: string]: string} = {
    'min' : 'Error: Hours must be greater than or equal to 0.',
    'max' : 'Error: Hours must be less than or equal to 99.'
  };
  public errorMessageMinutes : {[key: string]: string} = {
    'min' : 'Error: Minutes must be greater than or equal to 0.',
    'max' : 'Error: Minutes must be less than or equal to 59.'
  };
  public errorMessageSeconds : {[key: string]: string} = {
    'min' : 'Error: Seconds must be greater than or equal to 0.',
    'max' : 'Error: Seconds must be less than or equal to 59.'
  };

  constructor(
    private activatedRoute : ActivatedRoute,
    private focusService : AppFocusService,
    private formService : AppFormService,
    private formBuilder : FormBuilder,
    private trackService : AppTrackService,
    private router : Router) {
    this.tracklistId = this.activatedRoute.snapshot.params['tracklistId'];
    this.trackId = this.activatedRoute.snapshot.params['trackId'];

    this.trackForm = this.formBuilder.group<TrackForm>({
      trackArtist : this.formBuilder.control('', {
        nonNullable: true,
      }),
      trackTitle : this.formBuilder.control('', {
        nonNullable: true,
      }),
      trackBPM : this.formBuilder.control(null, {
        validators: Validators.pattern(BPM_PATTERN)
      }),
      trackKey : this.formBuilder.control('', {
        nonNullable: true,
      }),
      trackStartTime: this.formBuilder.group<TrackTimeForm>({
        trackHours : this.formBuilder.control(null),
        trackMinutes : this.formBuilder.control(null),
        trackSeconds : this.formBuilder.control(null)
      }),
      trackEndTime: this.formBuilder.group<TrackTimeForm>({
        trackHours : this.formBuilder.control(null),
        trackMinutes : this.formBuilder.control(null),
        trackSeconds : this.formBuilder.control(null)
      })
    });
  }

  ngOnInit(): void {
    if (!this.trackId) {
      this.trackFormTitle = ADD_TRACK_TITLE;
    } else {
      this.trackFormTitle = EDIT_TRACK_TITLE;
    }

    if (this.trackId) {
      this.trackIsLoading = true;

      this.trackEnd = new Subject<void>();

      this.track =
      this.trackService.retrieveTrack(
        this.tracklistId, this.trackId).pipe(
          takeUntil(this.trackEnd));

      this.track.subscribe({
        next: data => {
          if (data) {
            this.trackForm.controls.
              trackArtist.setValue(data.artist);
            this.trackForm.controls.
              trackTitle.setValue(data.title);
            if (data.bpm !== null) {
              this.trackForm.controls.
                trackBPM.setValue(data.bpm);
            }
            this.trackForm.controls.
              trackKey.setValue(data.key);
            if (data.startTime !== null) {
              let hhmmss : number[] =
                AppTrackHelper.getInstance().
                  getLengthHHMMSS(data.startTime);
              this.trackStartTimeForm.controls.
                trackHours.setValue(hhmmss[0]);
              this.trackStartTimeForm.controls.
                trackMinutes.setValue(hhmmss[1]);
              this.trackStartTimeForm.controls.
                trackSeconds.setValue(hhmmss[2]);
            }
            if (data.endTime !== null) {
              let hhmmss : number[] =
                AppTrackHelper.getInstance().
                  getLengthHHMMSS(data.endTime);
              this.trackEndTimeForm.controls.
                trackHours.setValue(hhmmss[0]);
              this.trackEndTimeForm.controls.
                trackMinutes.setValue(hhmmss[1]);
              this.trackEndTimeForm.controls.
                trackSeconds.setValue(hhmmss[2]);
            }
          } else {
            this.displayNotFoundPage();
          }
          this.trackIsLoading = false;
        },
        error: () => {
          this.displayErrorMessage(
            AppTracklistMessages.MSG_RETRIEVE_TRACK_FAILED)
          this.trackIsLoading = false;
        }
      });
    }
  }

  ngOnDestroy() : void {
    if (this.trackEnd) {
      this.trackEnd.next();
      this.trackEnd.complete();
    }
  }

  submit() : void {
    if (this.trackForm.valid) {
      this.trackIsUpdating = true;

      let trackArtist : string =
        this.trackForm.controls.trackArtist.value.trim();
      let trackTitle : string =
        this.trackForm.controls.trackTitle.value.trim();

      if (trackArtist === '') {
        trackArtist = UNKNOWN_TRACK;
      }
      if (trackTitle === '') {
        trackTitle = UNKNOWN_TRACK;
      }

      let trackBPM =
        this.trackForm.controls.trackBPM.value;

      let trackKey =
        this.trackForm.controls.trackKey.value;

      let trackStartTimeHHMMSS : number[] = [
        this.trackStartTimeForm.controls.trackHours.value,
        this.trackStartTimeForm.controls.trackMinutes.value,
        this.trackStartTimeForm.controls.trackSeconds.value
      ];
      let trackEndTimeHHMMSS : number[] = [
        this.trackEndTimeForm.controls.trackHours.value,
        this.trackEndTimeForm.controls.trackMinutes.value,
        this.trackEndTimeForm.controls.trackSeconds.value
      ];

      let trackStartTime =
        AppTrackHelper.getInstance().
          getLengthSeconds(trackStartTimeHHMMSS);
      let trackEndTime =
        AppTrackHelper.getInstance().
          getLengthSeconds(trackEndTimeHHMMSS);

      let trackInput =
        new TrackBuilder().
          withArtist(trackArtist).
          withTitle(trackTitle).
          withBPM(trackBPM).
          withKey(trackKey).
          withStartTime(trackStartTime).
          withEndTime(trackEndTime).
          buildTrack().
          buildDocument();

      if (!this.trackId) {
        trackInput.created = firebase.firestore.Timestamp.fromDate(new Date());

        this.trackService.addTrack(
          this.tracklistId, trackInput).then(
          () => this.setTrackNameAdded(trackInput.title),
          () => this.displayErrorMessage(
            AppTracklistMessages.MSG_ADD_TRACK_FAILED)).
          finally(() => this.trackIsUpdating = false);
      }
      else {
        this.trackService.updateTrack(
          this.tracklistId, this.trackId, trackInput).then(
          () => this.setTrackNameUpdated(trackInput.title),
          () => this.displayErrorMessage(
            AppTracklistMessages.MSG_UPDATE_TRACK_FAILED)).
          finally(() => this.trackIsUpdating = false);
      }
    } else {
      this.trackErrorMessage = null;
      this.formService.revealAllErrors(this.trackForm);
      this.focusService.focusErrorHeader();
    }
  }

  cancel() : void {
    this.displayPreviousPage();
  }

  isWorking() : boolean {
    return this.trackIsLoading || this.trackIsUpdating;
  }

  // ----------
  // Messaging
  // ----------

  private displayPreviousPage() : void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  private displayNotFoundPage() : void {
    this.router.navigate(['/notfound']);
  }

  private setTrackNameAdded(trackTitle : string) {
    this.trackService.recentlyAddedTrackTitle = trackTitle;
    this.displayPreviousPage();
  }

  private setTrackNameUpdated(trackTitle : string) {
    this.trackService.recentlyUpdatedTrackTitle = trackTitle;
    this.displayPreviousPage();
  }

  private displayErrorMessage(errorMessage : string) {
    this.trackErrorMessage = errorMessage;
    this.focusService.focusErrorHeader();
  }

  // --

  get trackStartTimeForm() : FormGroup<TrackTimeForm> {
    return this.trackForm.controls.trackStartTime;
  }

  get trackEndTimeForm() : FormGroup<TrackTimeForm> {
    return this.trackForm.controls.trackEndTime;
  }
}