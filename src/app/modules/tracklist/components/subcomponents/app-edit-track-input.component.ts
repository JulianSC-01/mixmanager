import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Track, TrackBuilder } from '../../objects/track';
import { AppTracklistMessages } from '../../messages/app-tracklist-messages';
import { AppTrackHelper } from '../../helpers/app-track-helper';
import { AppTrackService } from '../../services/app-track.service';
import firebase from 'firebase/compat/app';

const ID_TRACK : string = 'ID';
const UNKNOWN_VALUE = '?';

@Component({
  selector: 'app-edit-track-input',
  templateUrl: './app-edit-track-input.component.html'
})
export class AppEditTrackInputComponent implements OnInit, OnDestroy {

  /*
   * Input Data
   *
   * tracklistId: The tracklist ID
   * trackId: The track ID
   */
  @Input() tracklistId : string;
  @Input() trackId : string;

  /*
   * Output Emitters
   *
   * onError: On any error (Emits error message)
   * onAdded: When a track is added (Emits track name)
   * onUpdated: When a track is updated (Emits track name)
   * onCancel: When the user clicks the Cancel button
   * onNotFound: When the track is not found
   */
  @Output() onError = new EventEmitter<string>();
  @Output() onAdded = new EventEmitter<string>();
  @Output() onUpdated = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onNotFound = new EventEmitter<void>();

  public trackIsLoading : boolean;
  public trackIsUpdating : boolean;

  public trackTitle : string;
  public trackArtist : string;
  public trackBPM : number;
  public trackKey : string;
  public trackStartTime : number[];
  public trackEndTime : number[];

  public minorKeys : string[] = ['Ab','Eb','Bb','F','C','G','D','A','E','B','F#','Db'];
  public majorKeys : string[] = ['B','F#','Db','Ab','Eb','Bb','F','C','G','D','A','E'];

  public track : Observable<Track>;
  private trackEnd : Subject<void>;
  
  constructor(
    private trackService : AppTrackService) {
    this.trackKey = UNKNOWN_VALUE;
    this.trackStartTime = [null, null, null];
    this.trackEndTime = [null, null, null];
  }

  ngOnInit(): void {
    if (this.trackId) {
      this.trackIsLoading = true;
      
      this.trackEnd = new Subject<void>();

      this.track = 
      this.trackService.retrieveTrack(
        this.tracklistId, this.trackId).pipe(
          takeUntil(this.trackEnd));

      this.track.subscribe({
        next: data => {
          if (data) {
            this.trackTitle = data.title;
            this.trackArtist = data.artist;
            this.trackBPM = data.bpm;
            this.trackKey = data.key;
            this.trackStartTime =
              AppTrackHelper.getInstance().
                getLengthHHMMSS(data.startTime);
            this.trackEndTime =
              AppTrackHelper.getInstance().
                getLengthHHMMSS(data.endTime);
          } else {
            this.onNotFound.emit();
          }
          this.trackIsLoading = false;
        },
        error: () => {
          this.onError.emit(AppTracklistMessages.MSG_RETRIEVE_TRACK_FAILED)
          this.trackIsLoading = false;
        }
      });
    }
  }

  ngOnDestroy() : void {
    if (this.trackEnd) {
      this.trackEnd.next();
      this.trackEnd.complete();
    }
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

    let trackStartTime =
      AppTrackHelper.getInstance().getLengthSeconds(this.trackStartTime);

    let trackEndTime =
      AppTrackHelper.getInstance().getLengthSeconds(this.trackEndTime);

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
        withStartTime(trackStartTime).
        withEndTime(trackEndTime).
        buildInput();

    if (!this.trackId) {
      trackInput.created = firebase.firestore.Timestamp.fromDate(new Date());
  
      this.trackService.addTrack(
        this.tracklistId, trackInput).then(
        () => this.onAdded.emit(trackInput.title),
        () => this.onError.emit(AppTracklistMessages.MSG_ADD_TRACK_FAILED)).
        finally(() => this.trackIsUpdating = false);
    }
    else {
      this.trackService.updateTrack(
        this.tracklistId, this.trackId, trackInput).then(
        () => this.onUpdated.emit(trackInput.title),
        () => this.onError.emit(AppTracklistMessages.MSG_UPDATE_TRACK_FAILED)).
        finally(() => this.trackIsUpdating = false);
    }
  }

  cancel() : void {
    this.onCancel.emit();
  }

  isWorking() : boolean {
    return this.trackIsLoading || this.trackIsUpdating;
  }
}