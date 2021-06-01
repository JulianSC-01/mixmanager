import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Track, TrackBuilder } from '../../objects/track';
import { AppTracklistMessages } from '../../messages/app-tracklist-messages';
import { AppTrackService } from '../../services/app-track.service';
import * as firebase from 'firebase/app';

const ID_TRACK : string = 'ID';
const UNKNOWN_VALUE = '?';

@Component({
  selector: 'app-edit-track-input',
  templateUrl: './app-edit-track-input.component.html'
})
export class AppEditTrackInputComponent implements OnInit, OnDestroy {

  @Input() tracklistId : string;
  @Input() trackId : string;

  @Output() onError = new EventEmitter<string>();
  @Output() onCancelClick = new EventEmitter<void>();
  @Output() onTrackAdded = new EventEmitter<string>();
  @Output() onTrackUpdated = new EventEmitter<string>();
  @Output() onTrackNotFound = new EventEmitter<void>();

  public trackIsLoading : boolean;
  public trackIsUpdating : boolean;
  public trackTitle : string;
  public trackArtist : string;
  public trackBPM : number;
  public trackKey : string;

  public minorKeys : string[] = ['Ab','Eb','Bb','F','C','G','D','A','E','B','F#','Db'];
  public majorKeys : string[] = ['B','F#','Db','Ab','Eb','Bb','F','C','G','D','A','E'];

  public track : Observable<Track>;
  
  private activeSubscriptions : Subscription;
  
  constructor(
    private trackService : AppTrackService) { 
    this.activeSubscriptions = new Subscription();
  }

  ngOnInit(): void {
    if (!this.trackId) {
      this.trackKey = UNKNOWN_VALUE;
    }
    else {
      this.trackIsLoading = true;
      
      this.track = 
      this.trackService.retrieveTrack(this.tracklistId, this.trackId);
  
      this.activeSubscriptions.add(
        this.track.subscribe(
          data => {
            if (data) {
              this.trackTitle = data.title;
              this.trackArtist = data.artist;
              this.trackBPM = data.bpm;
              this.trackKey = data.key;
            } else {
              this.onTrackNotFound.emit();
            }
            this.trackIsLoading = false;
          },
          () => {
            this.onError.emit(AppTracklistMessages.MSG_RETRIEVE_TRACK_FAILED)
            this.trackIsLoading = false;
          }
        )
      );
    }
  }

  ngOnDestroy() : void {
    this.activeSubscriptions.unsubscribe();
  }

  submit() : void {
    this.trackIsUpdating = true;

    let trackTitle = 
    this.trackTitle == null ? null : this.trackTitle.trim();

    let trackArtist = 
    this.trackArtist == null ? null : this.trackArtist.trim();

    let trackBPM = 
    this.trackBPM == null ? 0 : this.trackBPM;
    
    let trackKey = 
    this.trackKey === '' ? UNKNOWN_VALUE : this.trackKey;

    if (trackTitle === null || trackTitle === '') {
      trackTitle = ID_TRACK;
    }
    if (trackArtist === null || trackArtist === '') {
      trackArtist = ID_TRACK;
    }

    let trackInput = 
      new TrackBuilder().
        withTitle(trackTitle).
        withArtist(trackArtist).
        withBPM(trackBPM).
        withKey(trackKey).
        buildInput();

    if (!this.trackId) {
      trackInput.created = firebase.firestore.Timestamp.fromDate(new Date());
  
      this.trackService.addTrack(
        this.tracklistId, trackInput).then(
        () => this.onTrackAdded.emit(trackInput.title),
        () => this.onError.emit(AppTracklistMessages.MSG_ADD_TRACK_FAILED)).
        finally(() => this.trackIsUpdating = false);
    }
    else {
      this.trackService.updateTrack(
        this.tracklistId, this.trackId, trackInput).then(
        () => this.onTrackUpdated.emit(trackInput.title),
        () => this.onError.emit(AppTracklistMessages.MSG_UPDATE_TRACK_FAILED)).
        finally(() => this.trackIsUpdating = false);
    }
  }

  cancel() : void {
    this.onCancelClick.emit();
  }

  isWorking() : boolean {
    return this.trackIsLoading || this.trackIsUpdating;
  }
}