import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import firebase from 'firebase/compat/app';
import {
  AlertComponent, AppFocusService, FormErrorHeaderComponent, FormInputTextComponent,
  PageHeaderComponent, SpinnerComponent
} from 'js-shared';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppTracklistService } from '../../services/app-tracklist.service';
import { AppAddIconComponent } from '../../shared/components/app-add-icon.component';
import { AppDeleteIconComponent } from '../../shared/components/app-delete-icon.component';
import { AppTracklist, TracklistBuilder } from '../app-tracklist';
import { AppTracklistMessages } from '../util/app-tracklist-messages';

const UNTITLED_TRACKLIST : string = 'Untitled Tracklist';

@Component({
  imports: [
    AlertComponent,
    AppAddIconComponent,
    AppDeleteIconComponent,
    CommonModule,
    FormErrorHeaderComponent,
    FormInputTextComponent,
    FormsModule,
    PageHeaderComponent,
    RouterLink,
    SpinnerComponent
  ],
  selector: 'app-tracklist',
  standalone: true,
  styleUrl: './app-tracklist.component.css',
  templateUrl: './app-tracklist.component.html'
})
export class AppTracklistComponent {
  public tracklistsAreLoading : boolean;
  public tracklistCount : number;
  public tracklistIsAdding : boolean;
  public tracklistToAdd : string = '';

  public tracklists : Observable<AppTracklist[]>;
  private tracklistsEnd : Subject<void>;

  public tracklistErrorMessage : string;
  public tracklistSuccessMessage : string;

  constructor(
    private focusService : AppFocusService,
    private tracklistService : AppTracklistService,) {}

  ngOnInit() : void {
    this.tracklistsAreLoading = true;
    this.tracklistCount = 0;

    this.tracklistsEnd = new Subject<void>();

    this.tracklists =
    this.tracklistService.retrieveTracklists().
      pipe(takeUntil(this.tracklistsEnd));

    this.tracklists.subscribe({
      next: data => {
        this.tracklistCount = data.length;
        this.tracklistsAreLoading = false;
      },
      error: () => {
        this.displayErrorMessage(
          AppTracklistMessages.MSG_RETRIEVE_TRACKLISTS_FAILED);
        this.tracklistsAreLoading = false;
      }
    });
  }

  ngOnDestroy() : void {
    this.tracklistsEnd.next();
    this.tracklistsEnd.complete();
  }

  addTracklist() : void {
    this.tracklistIsAdding = true;

    let newTracklistTitle =
      this.tracklistToAdd.trim();

    if (newTracklistTitle === '') {
      newTracklistTitle = UNTITLED_TRACKLIST;
    }

    let tracklistData =
      new TracklistBuilder().
        withTitle(newTracklistTitle).
        buildTracklist().
        buildDocument();

    tracklistData.created =
      firebase.firestore.Timestamp.fromDate(new Date());

    this.tracklistService.addTracklist(
      tracklistData).then(
      () => this.displayAddMessage(newTracklistTitle),
      () => this.displayErrorMessage(
        AppTracklistMessages.MSG_ADD_TRACKLIST_FAILED)).
      finally(
      () => {
        this.tracklistToAdd = '';
        this.tracklistIsAdding = false;
      }
    );
  }

  removeTracklist(tracklistId : string, tracklistName : string) : void {
    this.tracklistService.removeTracklist(
      tracklistId).then(
      () => this.displayRemoveMessage(tracklistName),
      () => this.displayErrorMessage(
        AppTracklistMessages.MSG_REMOVE_TRACKLIST_FAILED));
  }

  // ----------
  // Messaging
  // ----------

  private displayAddMessage(tracklistName : string) {
    this.displaySuccessMessage(
      AppTracklistMessages.MSG_ADD_SUCCESSFUL.replace('{0}', tracklistName));
  }

  private displayRemoveMessage(tracklistName : string) {
    this.displaySuccessMessage(
      AppTracklistMessages.MSG_REMOVE_SUCCESSFUL.replace('{0}', tracklistName));
  }

  private displaySuccessMessage(successMessage : string) {
    this.tracklistSuccessMessage = successMessage;
    this.focusService.focusSuccessHeader();
  }

  private displayErrorMessage(errorMessage : string) {
    this.tracklistErrorMessage = errorMessage;
    this.focusService.focusErrorHeader();
  }
}