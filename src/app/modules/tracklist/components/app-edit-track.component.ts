import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Track } from '../interfaces/track';
import { AppTracklistMessages } from '../messages/app-tracklist-messages';
import { AppTracklistService } from '../services/app-tracklist.service';

const ADD_TRACK_TITLE : string = 'Add track';
const EDIT_TRACK_TITLE : string = 'Edit track';

const ID_TRACK : string = 'ID';

@Component({
  selector: 'app-app-edit-track',
  templateUrl: './app-edit-track.component.html'
})
export class AppEditTrackComponent implements OnInit, OnDestroy {

  public trackErrorMessage : string;

  private tracklistId : string;
  private trackId : string;

  public trackIsLoading : boolean;
  public trackIsUpdating : boolean;

  // Retrieval (Track)
  public track : Observable<Track>;
  private trackSubscription : Subscription;

  // Form Header
  public trackFormTitle : string;

  // Form Fields
  public trackTitle : string;
  public trackArtist : string;
  public trackBPM : number;
  public trackKey : string;

  // Key Lists
  public minorKeys : string[] = ['Ab','Eb','Bb','F','C','G','D','A','E','B','F#','Db'];
  public majorKeys : string[] = ['B','F#','Db','Ab','Eb','Bb','F','C','G','D','A','E'];

  constructor(
    private ats : AppTracklistService,
    private activatedRoute : ActivatedRoute,
    private rtr : Router) { 
  }

  ngOnInit(): void {
    let routeSnapshot : ActivatedRouteSnapshot = 
    this.activatedRoute.snapshot;

    this.tracklistId = routeSnapshot.params['tracklistId'];
    this.trackId = routeSnapshot.params['trackId'];

    if (this.isAdding()) {
      this.trackFormTitle = ADD_TRACK_TITLE;
      this.trackKey = '?';
    }

    if (this.isEditing()) {
      this.trackFormTitle = EDIT_TRACK_TITLE;
      this.trackIsLoading = true;
      
      this.track = 
      this.ats.retrieveTrack(this.tracklistId, this.trackId);
  
      this.trackSubscription = 
      this.track.subscribe(
        data => {
          this.initializeTrack(data);
          this.trackIsLoading = false;
        },
        () => {
          this.trackErrorMessage = 
          AppTracklistMessages.MSG_RETRIEVE_TRACK_FAILED;
          this.trackIsLoading = false;
        }
      );
    }
  }

  initializeTrack(data : Track) : void {
    if (data == null) {
      this.rtr.navigate(['/notfound']);
    } 
    else {
      this.trackTitle = data.title;
      this.trackArtist = data.artist;
      this.trackBPM = data.bpm;
      this.trackKey = data.key;
    }
  }

  ngOnDestroy() : void {
    if (this.trackSubscription != null && !this.trackSubscription.closed) {
      this.trackSubscription.unsubscribe();
    }
  }

  //-

  submit() : void {
    this.clearErrors();

    if (this.isAdding()) {
      this.addTrack();
    }
    
    if (this.isEditing()) {
      this.editTrack();
    }
  }

  addTrack() : void {
    this.trackIsUpdating = true;

    let trackInput = this.buildInput();
    trackInput.created = this.ats.getCurrentTimestamp();

    this.ats.addTrack(
      this.tracklistId, trackInput).
      then(
        () => {
          this.ats.recentlyAddedTrackTitle = trackInput.title;
          this.return(); 
        },
        () => {
          this.trackErrorMessage =
          AppTracklistMessages.MSG_ADD_TRACK_FAILED 
        }
      ).
      finally(
        () => this.trackIsUpdating = false
      );
  }

  editTrack() : void {
    this.trackIsUpdating = true;

    let trackInput = this.buildInput();

    this.ats.updateTrack(
      this.tracklistId, this.trackId, trackInput).
      then(
        () => {
          this.ats.recentlyUpdatedTrackTitle = trackInput.title;
          this.return(); 
        },
        () => {
          this.trackErrorMessage =
          AppTracklistMessages.MSG_UPDATE_TRACK_FAILED 
        }
      ).
      finally(
        () => this.trackIsUpdating = false
      );
  }

  return() : void {
    this.rtr.navigate(['/tracklists', this.tracklistId]);
  }

  // --

  buildInput() : any {
    let trackTitle = 
    this.trackTitle == null ? 
    null : this.trackTitle.trim();

    let trackArtist = 
    this.trackArtist == null ? 
    null : this.trackArtist.trim();

    let trackBPM = 
    this.trackBPM == null ? 
    0 : this.trackBPM;

    let trackKey = 
    this.trackKey === '' ? 
    '?' : this.trackKey;

    if (trackTitle === null || trackTitle === '') {
      trackTitle = ID_TRACK;
    }
    if (trackArtist === null || trackArtist === '') {
      trackArtist = ID_TRACK;
    }

    return {
      title : trackTitle,
      artist : trackArtist,
      bpm : trackBPM,
      key : trackKey
    };
  }

  // --

  isAdding() : boolean {
    return this.trackId == null;
  }

  isEditing() : boolean {
    return this.trackId != null;
  }

  isWorking() : boolean {
    return this.trackIsLoading || this.trackIsUpdating;
  }

  // --

  clearErrors() : void {
    this.trackErrorMessage = null;
  }
}
