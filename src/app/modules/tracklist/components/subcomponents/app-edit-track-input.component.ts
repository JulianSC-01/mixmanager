import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Track, TrackBuilder } from '../../objects/track';
import { AppTracklistMessages } from '../../messages/app-tracklist-messages';
import { AppTrackHelper } from '../../helpers/app-track-helper';
import { AppFocusService } from 'src/app/services/app-focus.service';
import { AppTrackService } from '../../services/app-track.service';
import { AppFormHelper } from 'src/app/modules/shared/helpers/app-form-helper';
import firebase from 'firebase/compat/app';

const UNKNOWN_TRACK : string = 'ID';

const BPM_PATTERN : RegExp = /^[0-9]{0,3}$/;
const TIME_PATTERN : RegExp = /^[0-9]{0,2}$/;

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
  selector: 'app-edit-track-input',
  templateUrl: './app-edit-track-input.component.html'
})
export class AppEditTrackInputComponent implements OnInit, OnDestroy {

  /*
   * Input Data
   *
   * tracklistId: The tracklist ID
   * trackId: The track ID
   */
  @Input() tracklistId : string;
  @Input() trackId : string;

  /*
   * Output Emitters
   *
   * onError: On any error (Emits error message)
   * onAdded: When a track is added (Emits track name)
   * onUpdated: When a track is updated (Emits track name)
   * onCancel: When the user clicks the Cancel button
   * onNotFound: When the track is not found
   */
  @Output() onError = new EventEmitter<string>();
  @Output() onAdded = new EventEmitter<string>();
  @Output() onUpdated = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onNotFound = new EventEmitter<void>();

  public trackIsLoading : boolean;
  public trackIsUpdating : boolean;

  public trackForm : FormGroup<TrackForm>;

  public minorKeys : string[] = ['Ab','Eb','Bb','F','C','G','D','A','E','B','F#','Db'];
  public majorKeys : string[] = ['B','F#','Db','Ab','Eb','Bb','F','C','G','D','A','E'];

  public track : Observable<Track>;
  private trackEnd : Subject<void>;
  
  constructor(
    private focusService : AppFocusService,
    private formBuilder : FormBuilder,
    private trackService : AppTrackService) {

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
        trackHours : this.formBuilder.control(null, {
          validators: [
            Validators.pattern(TIME_PATTERN),
            AppTrackHelper.getInstance().hoursValidator
          ]
        }),
        trackMinutes : this.formBuilder.control(null, {
          validators: [
            Validators.pattern(TIME_PATTERN),
            AppTrackHelper.getInstance().minutesValidator
          ]
        }),
        trackSeconds : this.formBuilder.control(null, {
          validators: [
            Validators.pattern(TIME_PATTERN),
            AppTrackHelper.getInstance().secondsValidator
          ]
        })
      }),
      trackEndTime: this.formBuilder.group<TrackTimeForm>({
        trackHours : this.formBuilder.control(null, {
          validators: [
            Validators.pattern(TIME_PATTERN),
            AppTrackHelper.getInstance().hoursValidator
          ]
        }),
        trackMinutes : this.formBuilder.control(null, {
          validators: [
            Validators.pattern(TIME_PATTERN),
            AppTrackHelper.getInstance().minutesValidator
          ]
        }),
        trackSeconds : this.formBuilder.control(null, {
          validators: [
            Validators.pattern(TIME_PATTERN),
            AppTrackHelper.getInstance().secondsValidator
          ]
        })
      })
    });
  }

  ngOnInit(): void {
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
            this.onNotFound.emit();
          }
          this.trackIsLoading = false;
        },
        error: () => {
          this.onError.emit(AppTracklistMessages.MSG_RETRIEVE_TRACK_FAILED)
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
          () => this.onAdded.emit(trackInput.title),
          () => this.onError.emit(AppTracklistMessages.MSG_ADD_TRACK_FAILED)).
          finally(() => this.trackIsUpdating = false);
      }
      else {
        this.trackService.updateTrack(
          this.tracklistId, this.trackId, trackInput).then(
          () => this.onUpdated.emit(trackInput.title),
          () => this.onError.emit(AppTracklistMessages.MSG_UPDATE_TRACK_FAILED)).
          finally(() => this.trackIsUpdating = false);
      }
    } else {
      this.focusService.focusErrorHeader();
    }
  }

  cancel() : void {
    this.onCancel.emit();
  }

  isWorking() : boolean {
    return this.trackIsLoading || this.trackIsUpdating;
  }

  getHeaderErrorMessage() : string {
    return AppFormHelper.getInstance().getErrorCountHeaderMessage(this.trackForm);
  }

  // --

  get trackStartTimeForm() : FormGroup<TrackTimeForm> {
    return this.trackForm.controls.trackStartTime;
  }

  get trackEndTimeForm() : FormGroup<TrackTimeForm> {
    return this.trackForm.controls.trackEndTime;
  }
}