import {
  ChangeDetectionStrategy, Component, computed,
  inject, Injector, input, OnDestroy, OnInit, signal, Signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  AlertComponent, FocusService, FormInputTextComponent,
  FormLabelComponent, LeadingZeroPipe, PageHeaderComponent, SpinnerComponent
} from 'ngx-js-shared';
import { catchError, of, tap } from 'rxjs';
import { AppTrackService } from '../../services/app-track.service';
import { AppTracklistService } from '../../services/app-tracklist.service';
import { AppTrack } from '../models/app-track';
import { AppTracklist } from '../models/app-tracklist';
import { AppTrackLengthA11yPipe } from '../pipes/app-track-length-a11y.pipe';
import { AppTrackLengthPipe } from '../pipes/app-track-length.pipe';
import { AppTracklistMessages } from '../util/app-tracklist-messages';

@Component({
  imports: [
    AlertComponent,
    AppTrackLengthPipe,
    AppTrackLengthA11yPipe,
    FormInputTextComponent,
    FormLabelComponent,
    FormsModule,
    LeadingZeroPipe,
    PageHeaderComponent,
    RouterLink,
    SpinnerComponent
  ],
  selector: 'app-edit-tracklist',
  styleUrl: './app-edit-tracklist.component.css',
  templateUrl: './app-edit-tracklist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppEditTracklistComponent
  implements OnInit, OnDestroy {
  private readonly activatedRoute =
    inject(ActivatedRoute);
  private readonly focusService =
    inject(FocusService);
  private readonly injector =
    inject(Injector);
  private readonly trackService =
    inject(AppTrackService);
  private readonly tracklistService =
    inject(AppTracklistService);
  private readonly router =
    inject(Router);

  readonly tracklistId =
    input.required<string>();

  tracklist: Signal<AppTracklist>;

  readonly tracklistIsLoading =
    computed(() =>
      this.tracklist() === undefined);
  readonly tracklistTitle =
    computed(() => !!this.tracklist() ?
      this.tracklist().title : '');

  readonly tracklistTitleToEdit =
    signal('');
  readonly isTitleBeingEdited =
    signal(false);
  readonly isTitleBeingSaved =
    signal(false);

  tracks: Signal<AppTrack[]>;

  readonly tracksAreLoading =
    computed(() => !this.tracks());

  readonly tracksSelected =
    signal<string[]>([]);
  readonly tracksSelectedCount =
    computed(() =>
      this.tracksSelected().length);

  readonly trackTitleSelected =
    signal<string>(null);
  readonly tracksAreUpdating =
    signal(false);

  readonly errorMessage =
    signal('');
  readonly successMessage =
    signal('');

  ngOnInit() {
    if (this.trackService.recentlyAddedTrackTitle) {
      this.displaySuccessMessage(
        AppTracklistMessages.MSG_ADD_SUCCESSFUL.
        replace('{0}', this.trackService.recentlyAddedTrackTitle));
    }
    else if (this.trackService.recentlyUpdatedTrackTitle) {
      this.displaySuccessMessage(
        AppTracklistMessages.MSG_UPDATE_SUCCESSFUL.
        replace('{0}', this.trackService.recentlyUpdatedTrackTitle));
    }

    this.loadTracklist();
    this.loadTracks();
  }

  ngOnDestroy() {
    this.trackService.recentlyAddedTrackTitle = null;
    this.trackService.recentlyUpdatedTrackTitle = null;
  }

  private loadTracklist() {
    const tracklist$ =
      this.tracklistService.
      retrieveTracklist(
        this.tracklistId()).pipe(
        tap({
          next: tracklist => {
            if (!tracklist) {
              this.router.navigate(['/notfound']);
            }
          }
        }),
        catchError(() => {
          this.displayErrorMessage(
            AppTracklistMessages.MSG_RETRIEVE_TITLE_FAILED);

          return of(null);
        }));

    this.tracklist =
      toSignal(tracklist$,
        { injector: this.injector });
  }

  private loadTracks() {
    const tracks$ =
      this.trackService.
      retrieveTracks(
        this.tracklistId()).pipe(
        catchError(() => {
          this.displayErrorMessage(
            AppTracklistMessages.MSG_RETRIEVE_TRACKS_FAILED);

          return of(Array<AppTrack>());
        }));

    this.tracks =
      toSignal(tracks$,
        { injector: this.injector });
  }

  onEditTitle() {
    this.tracklistTitleToEdit.set(this.tracklistTitle());
    this.isTitleBeingEdited.set(true);
    this.focusService.focusElement('#tracklistTitle');
  }

  onCancelEditTitle() {
    this.isTitleBeingEdited.set(false);
    this.focusService.focusElement('#editTitleButton');
  }

  editTitle() {
    this.isTitleBeingSaved.set(true);

    let tracklistTitle =
      this.tracklistTitleToEdit().trim();

    if (tracklistTitle === '') {
      tracklistTitle = 'Untitled Tracklist';
    }

    const tracklist:
      Partial<AppTracklist> = {
        title: tracklistTitle
      }

    this.tracklistService.
      updateTracklist(
        this.tracklistId(), tracklist).
      then(() => {
        this.displaySuccessMessage(
          AppTracklistMessages.MSG_UPDATE_TITLE_SUCCESSFUL);
      }, () => {
        this.displayErrorMessage(
          AppTracklistMessages.MSG_UPDATE_TITLE_FAILED);
      }).
      finally(() => {
        this.isTitleBeingEdited.set(false);
        this.isTitleBeingSaved.set(false);
      }
    );
  }

  addTrack() {
    this.router.navigate(
      ['add'], { relativeTo: this.activatedRoute });
  }

  editTrack() {
    if (this.tracksSelectedCount() === 1) {
      this.router.navigate(
        [this.tracksSelected()[0]],
        { relativeTo: this.activatedRoute });
    }
  }

  removeTracks() {
    if (this.tracksSelectedCount() > 0) {
      this.tracksAreUpdating.set(true);

      this.trackService.
        removeTracks(
          this.tracklistId(),
          this.tracksSelected()).
        then(() => {
          if (this.trackTitleSelected()) {
            this.displaySuccessMessage(
              AppTracklistMessages.MSG_REMOVE_SUCCESSFUL.
                replace('{0}', this.trackTitleSelected()));
          } else {
            this.displaySuccessMessage(
              AppTracklistMessages.MSG_REMOVE_TRACKS_SUCCESSFUL.
                replace('{0}', `${this.tracksSelectedCount()}`));
          }
        }, () => {
          this.displayErrorMessage(
            AppTracklistMessages.MSG_REMOVE_TRACK_FAILED);
        }).
        finally(() => {
          this.tracksAreUpdating.set(false);
          this.tracksSelected.set([]);
        }
      );
    }
  }

  swapTracks() {
    if (this.tracksSelectedCount() === 2) {
      this.tracksAreUpdating.set(true);

      this.trackService.
        swapTracks(
          this.tracklistId(),
          this.tracksSelected()[0],
          this.tracksSelected()[1]).
        then(() => {
          this.displaySuccessMessage(
            AppTracklistMessages.MSG_SWAP_TRACKS_SUCCESSFUL);
        }, () => {
          this.displayErrorMessage(
            AppTracklistMessages.MSG_SWAP_TRACKS_FAILED);
        }).
        finally(() => {
          this.tracksAreUpdating.set(false);
        }
      );
    }
  }

  onTrackSelected(
    event: Event,
    trackId: string) {
    const selected =
      (<HTMLInputElement>event.target).checked

    if (selected) {
      this.tracksSelected.update(
        (selected) => [...selected, trackId]);
    } else {
      this.tracksSelected.update(
        (selected) => selected.filter(
          id => id !== trackId));
    }

    if (this.tracksSelectedCount() === 1) {
      this.trackTitleSelected.set(
        this.tracks().find(track =>
          this.tracksSelected()[0] ===
            track.id)?.title ?? null);
    } else {
      this.trackTitleSelected.set(null);
    }
  }

  private displaySuccessMessage(successMessage : string) {
    if (this.successMessage() === successMessage) {
      this.focusService.focusSuccessHeader();
    } else {
      this.successMessage.set(successMessage);
    }
  }

  private displayErrorMessage(errorMessage : string) {
    if (this.errorMessage() === errorMessage) {
      this.focusService.focusErrorHeader();
    } else {
      this.errorMessage.set(errorMessage);
    }
  }
}