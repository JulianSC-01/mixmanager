import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { AppTracklistMessages } from '../messages/app-tracklist-messages';
import { AppTracklistService } from '../services/app-tracklist.service';

import { Tracklist } from '../dto/tracklist';
import { Track } from '../dto/track';

import { ActivatedRoute, Router } from '@angular/router';

const UNTITLED_TRACKLIST : string = 'Untitled Tracklist';

@Component({
  selector: 'app-edit-tracklist',
  templateUrl: './app-edit-tracklist.component.html',
  styleUrls: ['./app-edit-tracklist.component.css']
})
export class AppEditTracklistComponent implements OnInit, OnDestroy {

  public loadingMessage = AppTracklistMessages.MSG_LOADING;
  
  public tracklistErrorMessage : string;
  public tracklistSuccessMessage : string;

  public tracksSelected : string[];
  private trackSelected : string;

  private tracklistId : string;

  // Retrieval (Tracklist)
  public tracklist : Observable<Tracklist>;
  private tracklistSubscription : Subscription;

  // Edit Title
  public isTitleBeingEdited : boolean;
  public isTitleBeingSaved : boolean;
  public tracklistTitle : string;
  public tracklistTitleToEdit : string;

  // Retrieval (Tracks)
  public tracksAreLoading : boolean;
  public trackCount : number;

  public tracks : Observable<Track[]>;
  private tracksSubscription : Subscription;

  // Remove Tracks
  // Swap Tracks
  public tracksAreUpdating : boolean;

  constructor(
    private ats : AppTracklistService,
    private activatedRoute : ActivatedRoute,
    private rtr : Router) { 
    this.tracksSelected = [];
  }

  // ---------------
  // -- RETRIEVAL --
  // ---------------

  ngOnInit() : void {
    this.tracklistId = 
    this.activatedRoute.snapshot.params['tracklistId'];

    this.tracksAreLoading = true;
    this.trackCount = 0;
    
    this.tracklist = 
    this.ats.retrieveTracklist(this.tracklistId);

    this.tracklistSubscription = 
    this.tracklist.subscribe(
      data => {
        this.initializeTracklist(data);
      },
      () => {
        this.tracklistErrorMessage = 
        AppTracklistMessages.MSG_RETRIEVE_TRACKLIST_FAILED;
      }
    );
  }

  initializeTracklist(data : Tracklist) : void {
    if (data == null) {
      this.rtr.navigate(['/notfound']);
    } 
    else {
      this.tracklistTitle = data.title;
      
      this.tracks = 
      this.ats.retrieveTracks(this.tracklistId);

      this.tracksSubscription = 
      this.tracks.subscribe(
        data => {
          this.initializeMessages();
          this.trackCount = data.length;
          this.tracksAreLoading = false;
        },
        () => {
          this.tracklistErrorMessage = 
          AppTracklistMessages.MSG_RETRIEVE_TRACKS_FAILED;
          this.tracksAreLoading = false;
        }
      );
    }
  }

  initializeMessages() : void {
    if (this.ats.recentlyAddedTrackTitle) {
      this.tracklistSuccessMessage =
      AppTracklistMessages.MSG_ADD_SUCCESSFUL.
      replace('{0}', this.ats.recentlyAddedTrackTitle);
    }
    if (this.ats.recentlyUpdatedTrackTitle) {
      this.tracklistSuccessMessage =
      AppTracklistMessages.MSG_UPDATE_SUCCESSFUL.
      replace('{0}', this.ats.recentlyUpdatedTrackTitle);
    }
  }

  ngOnDestroy() : void {
    if (!this.tracklistSubscription.closed) {
      this.tracklistSubscription.unsubscribe();
    }
    if (this.tracksSubscription != null && !this.tracksSubscription.closed) {
      this.tracksSubscription.unsubscribe();
    }

    this.ats.recentlyAddedTrackTitle = null;
    this.ats.recentlyUpdatedTrackTitle = null;
  }

  // ----------------
  // -- EDIT TITLE --
  // ----------------

  onEditTitle() : void {
    this.tracklistTitleToEdit = this.tracklistTitle;
    this.isTitleBeingEdited = true;
  }

  onCancelEditTitle() : void {
    this.isTitleBeingEdited = false;
  }

  saveTitle() : void {
    this.isTitleBeingSaved = true;
    this.clearErrors();

    let newTracklistTitle = 
    this.tracklistTitleToEdit == null ? 
    null : this.tracklistTitleToEdit.trim();

    if (newTracklistTitle === null || newTracklistTitle === '') {
      newTracklistTitle = UNTITLED_TRACKLIST;
    }

    let tracklistData = {
      title : newTracklistTitle
    };

    this.ats.updateTracklist(
    this.tracklistId, tracklistData).
    then(
      () => this.tracklistSuccessMessage =
            AppTracklistMessages.MSG_UPDATE_TITLE_SUCCESSFUL,
      () => this.tracklistErrorMessage = 
            AppTracklistMessages.MSG_UPDATE_TITLE_FAILED
      ).
    finally(
      () => {
        this.isTitleBeingEdited = false;
        this.isTitleBeingSaved = false;
      }
    );
  }

  // ---------------
  // -- ADD TRACK --
  // ---------------

  addTrack() : void {
    this.rtr.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  // ----------------
  // -- EDIT TRACK --
  // ----------------

  editTrack() : void {
    if (this.tracksSelected.length === 1) {
      this.rtr.navigate([this.tracksSelected[0]], { relativeTo: this.activatedRoute });
    }
  }

  // -------------------
  // -- REMOVE TRACKS --
  // -------------------

  removeTracks() : void {
    this.tracksAreUpdating = true;
    this.clearErrors();

    let tracksToRemove : number = this.tracksSelected.length;

    this.ats.removeTracks(this.tracklistId, this.tracksSelected).
    then(
      () => {
        this.tracklistSuccessMessage = 
        tracksToRemove === 1 ?
        AppTracklistMessages.MSG_REMOVE_SINGLE_SUCCESSFUL.
        replace('{0}', this.trackSelected) :
        AppTracklistMessages.MSG_REMOVE_TRACK_MULTIPLE_SUCCESSFUL.
        replace('{0}', tracksToRemove.toString());
      },
      () => {
        this.tracklistErrorMessage = 
        AppTracklistMessages.MSG_REMOVE_TRACK_FAILED;
      }
    ).
    finally(
      () => this.tracksAreUpdating = false
    );
  }

  // -----------------
  // -- SWAP TRACKS --
  // -----------------

  swapTracks() : void {
    this.tracksAreUpdating = true;
    this.clearErrors();

    this.ats.swapTracks(
      this.tracklistId, 
      this.tracksSelected[0], 
      this.tracksSelected[1]).then(
      () => this.tracklistSuccessMessage = 
            AppTracklistMessages.MSG_SWAP_TRACKS_SUCCESSFUL,
      () => this.tracklistErrorMessage = 
            AppTracklistMessages.MSG_SWAP_TRACKS_FAILED).
    finally(() => {
      this.tracksAreUpdating = false
      this.tracksSelected = []
    });
  }

  // --

  onTrackSelected(selected : boolean, trackTitle : string, trackId : string) {
    if (selected)
      this.tracksSelected.push(trackId);
    else {
      for (let i = 0; i < this.tracksSelected.length; i++) {
        if (this.tracksSelected[i] === trackId) {
          this.tracksSelected.splice(i, 1);
          break;
        }
      }
    }
    if (this.tracksSelected.length === 1)
      this.trackSelected = trackTitle;
    else
      this.trackSelected = null;
  }

  // --

  clearErrors() : void {
    this.tracklistErrorMessage = null;
  }
}