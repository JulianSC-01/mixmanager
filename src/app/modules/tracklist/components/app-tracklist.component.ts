import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppTracklistMessages } from '../messages/app-tracklist-messages';
import { AppTracklistService } from '../services/app-tracklist.service';
import { Tracklist } from '../interfaces/tracklist';
import * as firebase from 'firebase/app';

const UNTITLED_TRACKLIST : string = 'Untitled Tracklist';

@Component({
  selector: 'app-tracklist',
  templateUrl: './app-tracklist.component.html',
  styleUrls: ['./app-tracklist.component.css']
})
export class AppTracklistComponent implements OnInit, OnDestroy {

  public loadingMessage = AppTracklistMessages.MSG_LOADING;

  public tracklistErrorMessage : string;
  public tracklistSuccessMessage : string;
  
  // Retrieval
  public tracklistsAreLoading : boolean;
  public tracklistCount : number;

  public tracklists : Observable<Tracklist[]>;
  private tracklistsSubscription : Subscription;

  // Add
  public tracklistIsAdding : boolean;
  public tracklistToAdd : string;

  // Remove
  public tracklistIsRemoving : boolean;

  constructor(
    private tracklistService : AppTracklistService) {
  }

  // ---------------
  // -- RETRIEVAL --
  // ---------------

  ngOnInit() : void {
    this.tracklistsAreLoading = true;
    this.tracklistCount = 0;

    this.tracklists = this.tracklistService.retrieveTracklists();

    this.tracklistsSubscription = 
    this.tracklists.subscribe(
      data => {
        this.tracklistCount = data.length;
        this.tracklistsAreLoading = false;
      },
      () => {
        this.tracklistErrorMessage = 
        AppTracklistMessages.MSG_RETRIEVE_TRACKLISTS_FAILED;
        this.tracklistsAreLoading = false;
      }
    );
  }

  ngOnDestroy() : void {
    if (!this.tracklistsSubscription.closed) {
      this.tracklistsSubscription.unsubscribe();
    }
  }

  // -------------------
  // -- ADD TRACKLIST --
  // -------------------

  addTracklist() : void {
    this.tracklistIsAdding = true;
    this.clearErrors();

    let tracklistTitle = 
    this.tracklistToAdd == null ? 
    null : this.tracklistToAdd.trim();

    if (tracklistTitle === null || tracklistTitle === '') {
        tracklistTitle = UNTITLED_TRACKLIST;
    }

    let tracklistData = {
      title : tracklistTitle,
      created : firebase.firestore.Timestamp.fromDate(new Date())
    };

    this.tracklistService.addTracklist(
    tracklistData).
    then(
      () => this.tracklistSuccessMessage =
            AppTracklistMessages.MSG_ADD_SUCCESSFUL.
            replace('{0}', tracklistData.title),
      () => this.tracklistErrorMessage = 
            AppTracklistMessages.MSG_ADD_TRACKLIST_FAILED
    ).
    finally(
      () => {
        this.tracklistToAdd = null;
        this.tracklistIsAdding = false;
      }
    );
  }

  isAddDisabled() : boolean {
    return this.tracklistsAreLoading || this.tracklistIsAdding;
  }

  // ----------------------
  // -- REMOVE TRACKLIST --
  // ----------------------

  removeTracklist(tracklistId : string, tracklistName : string) : void {
    this.tracklistIsRemoving = true;
    this.clearErrors();

    this.tracklistService.removeTracklist(tracklistId).then(
      () => {
        this.tracklistSuccessMessage =
        AppTracklistMessages.MSG_REMOVE_SINGLE_SUCCESSFUL.
        replace('{0}', tracklistName);
      }, 
      () => {
        this.tracklistErrorMessage =
        AppTracklistMessages.MSG_REMOVE_TRACKLIST_FAILED;
      }).
      finally(
        () => this.tracklistIsRemoving = false
      );
  }

  // --

  clearErrors() : void {
    this.tracklistErrorMessage = null;
  }
}
