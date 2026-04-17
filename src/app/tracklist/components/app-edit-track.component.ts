import {
  ChangeDetectionStrategy, Component, computed,
  inject, Injector, input, OnInit, Signal, signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FocusService, FormA11yDirective, FormErrorFeedbackComponent, FormErrorHeaderComponent,
  FormInputNumberComponent, FormInputSelectComponent, FormInputTextComponent,
  FormLabelComponent, PageHeaderComponent, SpinnerComponent
} from 'ngx-js-shared';
import { catchError, of, tap } from 'rxjs';
import { AppTrackService } from '../../services/app-track.service';
import { AppTrack } from '../models/app-track';
import { AppTracklistMessages } from '../util/app-tracklist-messages';

const BPM_PATTERN : RegExp = /^[0-9]{0,3}$/;

interface TrackForm {
  trackArtist: FormControl<string>;
  trackTitle: FormControl<string>;
  trackBPM: FormControl<number | null>;
  trackKey: FormControl<string>;
  trackStartTime: FormGroup<TrackTimeForm>;
  trackEndTime: FormGroup<TrackTimeForm>;
}

interface TrackTimeForm {
  trackHours: FormControl<number | null>;
  trackMinutes: FormControl<number | null>;
  trackSeconds: FormControl<number | null>;
}

type TrackResponse = AppTrack | null | undefined;

@Component({
  imports: [
    FormA11yDirective,
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
  templateUrl: './app-edit-track.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppEditTrackComponent implements OnInit {
  private readonly activatedRoute =
    inject(ActivatedRoute);
  private readonly focusService =
    inject(FocusService);
  private readonly formBuilder =
    inject(FormBuilder);
  private readonly injector =
    inject(Injector);
  private readonly trackService =
    inject(AppTrackService);
  private readonly router =
    inject(Router);

  trackForm:
    FormGroup<TrackForm>;

  readonly tracklistId =
    input.required<string>();
  readonly trackId =
    input.required<string>();

  readonly formTitle =
    computed(() => !this.trackId() ?
      'Add track' : 'Edit track');

  track: Signal<TrackResponse> | null = null;

  readonly trackIsLoading =
    computed(() =>
      !this.track ||
       this.track() === undefined);
  readonly trackIsUpdating =
    signal(false);
  readonly trackWorkInProgress =
    computed(() =>
      this.trackIsLoading() || this.trackIsUpdating());

  readonly minorKeys =
    signal(['Ab','Eb','Bb','F','C','G','D','A','E','B','F#','Db']);
  readonly majorKeys =
    signal(['B','F#','Db','Ab','Eb','Bb','F','C','G','D','A','E']);

  readonly errorMessage =
    signal('');

  readonly errorMessageMapBPM =
    signal<Record<string, string>>({
      'pattern' : 'Error: Track BPM is invalid.',
  });

  readonly errorMessageMapHours =
    signal<Record<string, string>>({
      'min' : 'Error: Hours must be greater than or equal to 0.',
      'max' : 'Error: Hours must be less than or equal to 99.'
  });
  readonly errorMessageMapMinutes =
    signal<Record<string, string>>({
      'min' : 'Error: Minutes must be greater than or equal to 0.',
      'max' : 'Error: Minutes must be less than or equal to 59.'
  });
  readonly errorMessageMapSeconds =
    signal<Record<string, string>>({
      'min' : 'Error: Seconds must be greater than or equal to 0.',
      'max' : 'Error: Seconds must be less than or equal to 59.'
  });

  constructor() {
    this.trackForm =
      this.formBuilder.
        group<TrackForm>({
      trackArtist:
        this.formBuilder.control('', {
          nonNullable: true,
        }),
      trackTitle:
        this.formBuilder.control('', {
          nonNullable: true,
        }),
      trackBPM:
        this.formBuilder.control(null, {
          validators:
            Validators.pattern(BPM_PATTERN)
        }),
      trackKey:
        this.formBuilder.control('', {
          nonNullable: true,
        }),
      trackStartTime:
        this.formBuilder.
          group<TrackTimeForm>({
        trackHours:
          this.formBuilder.control(null, {
            validators: [
              Validators.min(0),
              Validators.max(99)
            ]
          }),
        trackMinutes:
          this.formBuilder.control(null, {
            validators: [
              Validators.min(0),
              Validators.max(59)
            ]
          }),
        trackSeconds:
          this.formBuilder.control(null, {
            validators: [
              Validators.min(0),
              Validators.max(59)
            ]
          })
      }),
      trackEndTime:
        this.formBuilder.
          group<TrackTimeForm>({
        trackHours:
          this.formBuilder.control(null, {
            validators: [
              Validators.min(0),
              Validators.max(99)
            ]
          }),
        trackMinutes:
          this.formBuilder.control(null, {
            validators: [
              Validators.min(0),
              Validators.max(59)
            ]
          }),
        trackSeconds:
          this.formBuilder.control(null, {
            validators: [
              Validators.min(0),
              Validators.max(59)
            ]
          })
      })
    });
  }

  ngOnInit() {
    if (this.trackId()) {
      this.loadTrack();
    } else {
      this.track =
        signal<TrackResponse>(null);
    }
  }

  private loadTrack() {
    const tracks$ =
      this.trackService.
      retrieveTrack(
        this.tracklistId(),
        this.trackId()).pipe(
          tap({
            next: track => {
              if (track) {
                this.populateForm(track);
              } else {
                this.router.navigate(['/notfound']);
              }
            }
          }),
          catchError(() => {
            this.displayErrorMessage(
              AppTracklistMessages.MSG_RETRIEVE_TRACK_FAILED);

            return of(null);
          }));

    this.track =
      toSignal(tracks$,
        { injector: this.injector });
  }

  submit() {
    this.errorMessage.set('');

    if (this.trackForm.valid) {
      this.trackIsUpdating.set(true);

      let trackArtist =
        this.trackForm.controls.trackArtist.value.trim();
      let trackTitle =
        this.trackForm.controls.trackTitle.value.trim();

      if (trackArtist === '') {
        trackArtist = 'ID';
      }
      if (trackTitle === '') {
        trackTitle = 'ID';
      }

      let trackBPM =
        this.trackForm.controls.trackBPM.value;

      let trackKey =
        this.trackForm.controls.trackKey.value;

      let trackStartTimeHHMMSS = [
        this.trackStartTimeForm.controls.trackHours.value,
        this.trackStartTimeForm.controls.trackMinutes.value,
        this.trackStartTimeForm.controls.trackSeconds.value
      ];
      let trackEndTimeHHMMSS = [
        this.trackEndTimeForm.controls.trackHours.value,
        this.trackEndTimeForm.controls.trackMinutes.value,
        this.trackEndTimeForm.controls.trackSeconds.value
      ];

      let trackStartTime =
        this.trackService.trackHelper.
          getLengthSeconds(trackStartTimeHHMMSS);
      let trackEndTime =
        this.trackService.trackHelper.
          getLengthSeconds(trackEndTimeHHMMSS);

      const track:
        Partial<AppTrack> = {
          artist: trackArtist,
          title: trackTitle,
          bpm: trackBPM,
          key: trackKey,
          startTime: trackStartTime,
          endTime: trackEndTime
        }

      if (!this.trackId()) {
        this.trackService.addTrack(
          this.tracklistId(), track).
        then(() => {
          this.trackService.
            recentlyAddedTrackTitle = trackTitle;

          this.displayPreviousPage();
        }, () => {
          this.displayErrorMessage(
            AppTracklistMessages.MSG_ADD_TRACK_FAILED)
        }).
        finally(() => {
          this.trackIsUpdating.set(false)
        });
      }
      else {
        this.trackService.updateTrack(
          this.tracklistId(), this.trackId(), track).
        then(() => {
          this.trackService.
            recentlyUpdatedTrackTitle = trackTitle;

          this.displayPreviousPage();
        }, () => {
          this.displayErrorMessage(
            AppTracklistMessages.MSG_UPDATE_TRACK_FAILED)
        }).
        finally(() => {
          this.trackIsUpdating.set(false);
        });
      }
    }
  }

  cancel() {
    this.displayPreviousPage();
  }

  private populateForm(track: AppTrack) {
    this.trackForm.controls.
      trackArtist.setValue(track.artist);
    this.trackForm.controls.
      trackTitle.setValue(track.title);

    if (track.bpm !== null) {
      this.trackForm.controls.
        trackBPM.setValue(track.bpm);
    }

    this.trackForm.controls.
      trackKey.setValue(track.key);

    if (track.startTime !== null) {
      const hhmmss =
        this.trackService.trackHelper.
          getLengthHHMMSS(track.startTime);
      this.trackStartTimeForm.controls.
        trackHours.setValue(hhmmss[0]);
      this.trackStartTimeForm.controls.
        trackMinutes.setValue(hhmmss[1]);
      this.trackStartTimeForm.controls.
        trackSeconds.setValue(hhmmss[2]);
    }

    if (track.endTime !== null) {
      const hhmmss =
        this.trackService.trackHelper.
          getLengthHHMMSS(track.endTime);
      this.trackEndTimeForm.controls.
        trackHours.setValue(hhmmss[0]);
      this.trackEndTimeForm.controls.
        trackMinutes.setValue(hhmmss[1]);
      this.trackEndTimeForm.controls.
        trackSeconds.setValue(hhmmss[2]);
    }
  }

  private displayPreviousPage() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  private displayErrorMessage(errorMessage : string) {
    this.errorMessage.set(errorMessage);
    this.focusService.focusErrorHeader();
  }

  get trackStartTimeForm() {
    return this.trackForm.controls.trackStartTime;
  }

  get trackEndTimeForm() {
    return this.trackForm.controls.trackEndTime;
  }
}