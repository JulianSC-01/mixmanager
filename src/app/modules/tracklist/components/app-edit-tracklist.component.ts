import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppFocusService } from 'src/app/services/app-focus.service';
import { AppTracklistMessages } from '../messages/app-tracklist-messages';
import { Track } from '../objects/track';
import { Tracklist, TracklistBuilder } from '../objects/tracklist';
import { AppTrackService } from '../services/app-track.service';
import { AppTracklistService } from '../services/app-tracklist.service';

const UNTITLED_TRACKLIST : string = 'Untitled Tracklist';

@Component({
  selector: 'app-edit-tracklist',
  templateUrl: './app-edit-tracklist.component.html',
  styleUrls: ['./app-edit-tracklist.component.css']
})
export class AppEditTracklistComponent implements OnInit, OnDestroy {
  
  // Tracklist Title
  public tracklistIsLoading : boolean;
  public isTitleBeingEdited : boolean;
  public isTitleBeingSaved : boolean;
  public tracklistTitle : string;
  public tracklistTitleToEdit : string;
  private tracklist : Observable<Tracklist>;
  private tracklistEnd : Subject<void>;

  // Tracks
  public tracksAreLoading : boolean;
  public trackCount : number;
  public tracksAreUpdating : boolean;
  public tracksSelected : string[];
  private trackTitleSelected : string;
  public tracks : Observable<Track[]>;
  private tracksEnd : Subject<void>;
  
  public tracklistId : string;

  public tracklistErrorMessage : string;
  public tracklistSuccessMessage : string;

  constructor(
    private activatedRoute : ActivatedRoute,
    private focusService : AppFocusService,
    private trackService : AppTrackService,
    private tracklistService : AppTracklistService,
    private router : Router) {
    this.tracklistId = 
      this.activatedRoute.snapshot.params['tracklistId'];
  }

  ngOnInit() : void {
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

    this.loadTracklistTitle();
    this.loadTracks();
  }

  ngOnDestroy() : void {
    this.trackService.recentlyAddedTrackTitle = null;
    this.trackService.recentlyUpdatedTrackTitle = null;
    this.trackService.recentlyRemovedTrackTitle = null;

    this.tracklistEnd.next();
    this.tracklistEnd.complete();

    this.tracksEnd.next();
    this.tracksEnd.complete();
  }

  // ---------------
  // Tracklist Title
  // ---------------

  private loadTracklistTitle() : void {
    this.tracklistIsLoading = true;
    
    this.tracklistEnd = new Subject<void>();

    this.tracklist = 
    this.tracklistService.retrieveTracklist(
      this.tracklistId).pipe(takeUntil(this.tracklistEnd));

    this.tracklist.subscribe({
      next: data => {
        if (data) {
          this.tracklistTitle = data.title;
        } else {
          this.displayNotFoundPage();
        }
        this.tracklistIsLoading = false;
      },
      error: () => {
        this.tracklistIsLoading = false;
        this.displayErrorMessage(
          AppTracklistMessages.MSG_RETRIEVE_TITLE_FAILED)
      }
    });
  }

  onEditTitle() : void {
    this.tracklistTitleToEdit = this.tracklistTitle;
    this.isTitleBeingEdited = true;
    this.focusService.focusElement("#tracklistTitle");
  }

  onCancelEditTitle() : void {
    this.isTitleBeingEdited = false;
    this.focusService.focusElement("#editTitleButton");
  }

  saveTitle() : void {
    this.isTitleBeingSaved = true;

    let newTracklistTitle = 
    this.tracklistTitleToEdit == null ? 
    null : this.tracklistTitleToEdit.trim();

    if (newTracklistTitle === null || newTracklistTitle === '') {
      newTracklistTitle = UNTITLED_TRACKLIST;
    }

    let tracklistData = 
      new TracklistBuilder().
        withTitle(newTracklistTitle).
        buildTracklist().
        buildDocument();

    this.tracklistService.updateTracklist(
      this.tracklistId, tracklistData).then(
      () => this.displayTitleUpdatedMessage(),
      () => this.displayErrorMessage(
        AppTracklistMessages.MSG_UPDATE_TITLE_FAILED)).
      finally(() => {
        this.isTitleBeingEdited = false;
        this.isTitleBeingSaved = false;
      }
    );
  }

  // ------
  // Tracks
  // ------

  private loadTracks() : void {
    this.tracksAreLoading = true;
    this.trackCount = 0;
    this.tracksSelected = [];

    this.tracksEnd = new Subject<void>();
    
    this.tracks = 
    this.trackService.retrieveTracks(
      this.tracklistId).pipe(
        takeUntil(this.tracksEnd));

    this.tracks.subscribe({
      next: data => {
        if (data) {
          this.trackCount = data.length;
        } else {
          this.displayNotFoundPage();
        }
        this.tracksAreLoading = false;
      },
      error: () => {
        this.tracksAreLoading = false;
        this.displayErrorMessage(
          AppTracklistMessages.MSG_RETRIEVE_TRACKS_FAILED);
      }
    });
  }

  addTrack() : void {
    this.router.navigate(
      ['add'], { relativeTo: this.activatedRoute });
  }

  editTrack() : void {
    if (this.tracksSelected.length === 1) {
      this.router.navigate(
        [this.tracksSelected[0]], { relativeTo: this.activatedRoute });
    }
  }

  removeTracks() : void {
    if (this.tracksSelected.length > 0) {
      this.tracksAreUpdating = true;
      
      this.trackService.removeTracks(
        this.tracklistId, this.tracksSelected).then(
        () => {
          if (this.trackTitleSelected)
            this.trackService.recentlyRemovedTrackTitle = this.trackTitleSelected
          this.displayTracksRemovedMessage(this.tracksSelected)
        },
        () => this.displayErrorMessage(
          AppTracklistMessages.MSG_REMOVE_TRACK_FAILED)).
        finally(() => {
          this.tracksAreUpdating = false
          this.tracksSelected = []
        }
      );
    }
  }

  swapTracks() : void {
    if (this.tracksSelected.length === 2) {
      this.tracksAreUpdating = true;

      this.trackService.swapTracks(
        this.tracklistId, 
        this.tracksSelected[0], 
        this.tracksSelected[1]).then(
        () => this.displayTracksSwappedMessage(this.tracksSelected),
        () => this.displayErrorMessage(
          AppTracklistMessages.MSG_SWAP_TRACKS_FAILED)).
        finally(() => {
          this.tracksAreUpdating = false
          this.tracksSelected = []
        }
      );
    }
  }

  onTrackSelected(event : Event, trackTitle : string, trackId : string) {
    const selected =
      (<HTMLInputElement>event.target).checked

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
      this.trackTitleSelected = trackTitle;
    else
      this.trackTitleSelected = null;
  }

  // ----------
  // Messaging
  // ----------

  private displayNotFoundPage() : void {
    this.router.navigate(['/notfound']);
  }

  private displayTitleUpdatedMessage() {
    this.displaySuccessMessage(
      AppTracklistMessages.MSG_UPDATE_TITLE_SUCCESSFUL);
  }

  private displayTracksRemovedMessage(tracksRemoved : string[]) {
    if (this.trackService.recentlyRemovedTrackTitle) {
      this.displaySuccessMessage(
        AppTracklistMessages.MSG_REMOVE_SUCCESSFUL.replace('{0}', 
        this.trackService.recentlyRemovedTrackTitle));
    } else {
      this.displaySuccessMessage(
        AppTracklistMessages.MSG_REMOVE_TRACKS_SUCCESSFUL.replace('{0}', 
        tracksRemoved.length.toString()));
    }
  }

  private displayTracksSwappedMessage(tracksSwapped : string[]) {
    this.displaySuccessMessage(
      AppTracklistMessages.MSG_SWAP_TRACKS_SUCCESSFUL.replace('{0}', 
      tracksSwapped.length.toString()));
  }

  private displaySuccessMessage(successMessage : string) {
    if (this.tracklistSuccessMessage === successMessage) {
      this.focusService.focusSuccessHeader();
    } else {
      this.tracklistSuccessMessage = successMessage;
    }
  }

  private displayErrorMessage(errorMessage : string) {
    if (this.tracklistErrorMessage === errorMessage) {
      this.focusService.focusErrorHeader();
    } else {
      this.tracklistErrorMessage = errorMessage;
    }
  }
}