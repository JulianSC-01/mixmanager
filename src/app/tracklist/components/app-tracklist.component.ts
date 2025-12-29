import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertComponent, FocusService, FormInputTextComponent, PageHeaderComponent, SpinnerComponent } from 'ngx-js-shared';
import { catchError, of } from 'rxjs';
import { AppTracklistService } from '../../services/app-tracklist.service';
import { AppAddIconComponent } from '../../shared/components/app-add-icon.component';
import { AppDeleteIconComponent } from '../../shared/components/app-delete-icon.component';
import { AppTracklist } from '../models/app-tracklist';
import { AppTracklistMessages } from '../util/app-tracklist-messages';

@Component({
  imports: [
    AlertComponent,
    AppAddIconComponent,
    AppDeleteIconComponent,
    FormInputTextComponent,
    FormsModule,
    PageHeaderComponent,
    RouterLink,
    SpinnerComponent
  ],
  selector: 'app-tracklist',
  styleUrl: './app-tracklist.component.css',
  templateUrl: './app-tracklist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTracklistComponent {
  private readonly focusService =
    inject(FocusService);
  private readonly tracklistService =
    inject(AppTracklistService);

  readonly tracklistToAdd =
    signal('');

  private readonly tracklists$ =
    this.tracklistService.
      retrieveTracklists().
      pipe(catchError(() => {
        this.errorMessage.set(
          AppTracklistMessages.
            MSG_RETRIEVE_TRACKLISTS_FAILED);
        this.focusService.focusErrorHeader();

        return of(Array<AppTracklist>());
      }));

  readonly tracklists =
    toSignal(this.tracklists$);
  readonly tracklistCount =
    computed(() => !!this.tracklists() ?
      this.tracklists().length : 0);

  readonly isAdding =
    signal(false);
  readonly isLoading =
    computed(() => !this.tracklists());

  readonly errorMessage =
    signal('');
  readonly successMessage =
    signal('');

  addTracklist() {
    this.isAdding.set(true);

    let tracklistTitle =
      this.tracklistToAdd().trim();

    if (tracklistTitle === '') {
      tracklistTitle = 'Untitled Tracklist';
    }

    const tracklist:
      Partial<AppTracklist> = {
        title: tracklistTitle
      }

    this.tracklistService.
      addTracklist(tracklist).
      then(() => {
        this.successMessage.set(
          AppTracklistMessages.MSG_ADD_SUCCESSFUL.
            replace('{0}', tracklistTitle));
        this.focusService.focusSuccessHeader();
      }, () => {
        this.errorMessage.set(
          AppTracklistMessages.MSG_ADD_TRACKLIST_FAILED);
        this.focusService.focusErrorHeader();
      }).
      finally(() => {
        this.isAdding.set(false);
        this.tracklistToAdd.set('');
      });
  }

  removeTracklist(
    tracklistId: string, tracklistName: string) {
    this.tracklistService.
      removeTracklist(tracklistId).
      then(() => {
        this.successMessage.set(
          AppTracklistMessages.MSG_REMOVE_SUCCESSFUL.
            replace('{0}', tracklistName));
        this.focusService.focusSuccessHeader();
      }, () => {
        this.errorMessage.set(
          AppTracklistMessages.MSG_REMOVE_TRACKLIST_FAILED);
        this.focusService.focusErrorHeader();
      });
  }
}