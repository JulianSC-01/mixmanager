import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Track } from '../../objects/track';
import { AppTracklistMessages } from '../../messages/app-tracklist-messages';
import { AppTrackService } from '../../services/app-track.service';

@Component({
  selector: 'app-edit-tracklist-track-table',
  templateUrl: './app-edit-tracklist-track-table.component.html',
  styleUrls: ['./app-edit-tracklist-track-table.component.css']
})
export class AppEditTracklistTrackTableComponent implements OnInit, OnDestroy {

  @Input() tracklistId : string;

  @Output() onError = new EventEmitter<string>();
  @Output() onAddClick = new EventEmitter<void>();
  @Output() onEditClick = new EventEmitter<string>();
  @Output() onTracksRemoved = new EventEmitter<string[]>();
  @Output() onTracksSwapped = new EventEmitter<void>();
  @Output() onTracksNotFound = new EventEmitter<void>();

  public tracksAreLoading : boolean;
  public trackCount : number;
  public tracksAreUpdating : boolean;
  public tracksSelected : string[];
  private trackSelected : string;

  public tracks : Observable<Track[]>;
  
  private activeSubscriptions : Subscription;

  constructor(
    private trackService : AppTrackService) {
    this.activeSubscriptions = new Subscription();
    this.tracksSelected = [];
  }

  ngOnInit(): void {
    this.tracksAreLoading = true;
    this.trackCount = 0;
    
    this.tracks = 
    this.trackService.retrieveTracks(this.tracklistId);

    this.activeSubscriptions.add(
      this.tracks.subscribe(
        data => {
          if (data) {
            this.trackCount = data.length;
          } else {
            this.onTracksNotFound.emit();
          }
          this.tracksAreLoading = false;
        },
        () => {
          this.tracksAreLoading = false;
          this.onError.emit(AppTracklistMessages.MSG_RETRIEVE_TRACKS_FAILED);
        }
      )
    );
  }

  ngOnDestroy() : void {
    this.activeSubscriptions.unsubscribe();
  }

  addTrack() : void {
    this.onAddClick.emit();
  }

  editTrack() : void {
    if (this.tracksSelected.length === 1) {
      this.onEditClick.emit(this.tracksSelected[0]);
    }
  }

  removeTracks() : void {
    if (this.tracksSelected.length > 0) {
      this.tracksAreUpdating = true;
      
      this.trackService.removeTracks(
        this.tracklistId, this.tracksSelected).then(
        () => this.onTracksRemoved.emit(this.tracksSelected), 
        () => this.onError.emit(AppTracklistMessages.MSG_REMOVE_TRACK_FAILED)).
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
        () => this.onTracksSwapped.emit(),
        () => this.onError.emit(AppTracklistMessages.MSG_SWAP_TRACKS_FAILED)).
        finally(() => {
          this.tracksAreUpdating = false
          this.tracksSelected = []
        }
      );
    }
  }

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
}