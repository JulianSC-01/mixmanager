import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppTracklistMessages } from '../messages/app-tracklist-messages';
import { Tracklist, TracklistBuilder } from '../objects/tracklist';
import { AppFocusService } from 'js-shared';
import { AppTracklistService } from '../services/app-tracklist.service';
import firebase from 'firebase/compat/app';

const UNTITLED_TRACKLIST : string = 'Untitled Tracklist';

@Component({
  selector: 'app-tracklist',
  templateUrl: './app-tracklist.component.html',
  styleUrls: ['./app-tracklist.component.css']
})
export class AppTracklistComponent {

  public tracklistsAreLoading : boolean;
  public tracklistCount : number;
  public tracklistIsAdding : boolean;
  public tracklistToAdd : string = '';

  public tracklists : Observable<Tracklist[]>;
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