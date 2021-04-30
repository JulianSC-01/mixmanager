import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppTracklistMessages } from '../messages/app-tracklist-messages';
import { AppTracklistService } from '../services/app-tracklist.service';
import { AppTrackService } from '../services/app-track.service';
import { Tracklist } from '../interfaces/tracklist';
import { Track } from '../interfaces/track';

const UNTITLED_TRACKLIST : string = 'Untitled Tracklist';

@Component({
  selector: 'app-edit-tracklist',
  templateUrl: './app-edit-tracklist.component.html',
  styleUrls: ['./app-edit-tracklist.component.css']
})
export class AppEditTracklistComponent implements OnInit, OnDestroy {

  private activeSubscriptions : Subscription;
  
  private tracklistId : string;

  public loadingMessage = AppTracklistMessages.MSG_LOADING;
  public tracklistErrorMessage : string;
  public tracklistSuccessMessage : string;

  public tracksSelected : string[];
  private trackSelected : string;

  // Retrieval (Tracklist)
  public tracklist : Observable<Tracklist>;

  // Edit Title
  public isTitleBeingEdited : boolean;
  public isTitleBeingSaved : boolean;
  public tracklistTitle : string;
  public tracklistTitleToEdit : string;

  // Retrieval (Tracks)
  public tracksAreLoading : boolean;
  public trackCount : number;
  public tracks : Observable<Track[]>;

  // Remove Tracks
  // Swap Tracks
  public tracksAreUpdating : boolean;

  constructor(
    private activatedRoute : ActivatedRoute,
    private tracklistService : AppTracklistService,
    private trackService : AppTrackService,
    private router : Router) { 
    this.activeSubscriptions = new Subscription();
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
    this.tracklistService.retrieveTracklist(this.tracklistId);

    this.activeSubscriptions.add( 
    this.tracklist.subscribe(
      data => {
        this.initializeTracklist(data);
      },
      () => {
        this.tracklistErrorMessage = 
        AppTracklistMessages.MSG_RETRIEVE_TRACKLIST_FAILED;
      }
    ));
  }

  initializeTracklist(data : Tracklist) : void {
    if (data == null) {
      this.router.navigate(['/notfound']);
    } 
    else {
      this.tracklistTitle = data.title;
      
      this.tracks = 
      this.trackService.retrieveTracks(this.tracklistId);

      this.activeSubscriptions.add(
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
      ));
    }
  }

  initializeMessages() : void {
    if (this.trackService.recentlyAddedTrackTitle) {
      this.tracklistSuccessMessage =
      AppTracklistMessages.MSG_ADD_SUCCESSFUL.
      replace('{0}', this.trackService.recentlyAddedTrackTitle);
    }
    if (this.trackService.recentlyUpdatedTrackTitle) {
      this.tracklistSuccessMessage =
      AppTracklistMessages.MSG_UPDATE_SUCCESSFUL.
      replace('{0}', this.trackService.recentlyUpdatedTrackTitle);
    }
  }

  ngOnDestroy() : void {
    this.activeSubscriptions.unsubscribe();
    this.trackService.recentlyAddedTrackTitle = null;
    this.trackService.recentlyUpdatedTrackTitle = null;
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

    this.tracklistService.updateTracklist(
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
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  // ----------------
  // -- EDIT TRACK --
  // ----------------

  editTrack() : void {
    if (this.tracksSelected.length === 1) {
      this.router.navigate([this.tracksSelected[0]], { relativeTo: this.activatedRoute });
    }
  }

  // -------------------
  // -- REMOVE TRACKS --
  // -------------------

  removeTracks() : void {
    if (this.tracksSelected.length > 0) {
      this.tracksAreUpdating = true;
      this.clearErrors();

      let tracksToRemove : number = this.tracksSelected.length;

      this.trackService.removeTracks(this.tracklistId, this.tracksSelected).
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
      finally(() => {
        this.tracksAreUpdating = false
        this.tracksSelected = []
      });
    }
  }

  // -----------------
  // -- SWAP TRACKS --
  // -----------------

  swapTracks() : void {
    if (this.tracksSelected.length === 2) {
      this.tracksAreUpdating = true;
      this.clearErrors();

      this.trackService.swapTracks(
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