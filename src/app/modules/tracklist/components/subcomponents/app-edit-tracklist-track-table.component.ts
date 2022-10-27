import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Track } from '../../objects/track';
import { AppTracklistMessages } from '../../messages/app-tracklist-messages';
import { AppTrackService } from '../../services/app-track.service';

@Component({
  selector: 'app-edit-tracklist-track-table',
  templateUrl: './app-edit-tracklist-track-table.component.html',
  styleUrls: ['./app-edit-tracklist-track-table.component.css']
})
export class AppEditTracklistTrackTableComponent implements OnInit, OnDestroy {

  /*
   * Input Data
   *
   * tracklistId: The tracklist ID
   */
  @Input() tracklistId : string;

  /*
   * Output Emitters
   *
   * onError: On any error (Emits error message)
   * onAdd: When the user clicks the Add button
   * onEdit: When the user clicks the Edit button (Emits Track ID)
   * onRemoved: When tracks are removed (Emits Track IDs)
   * onSwapped: When tracks are swapped (Emits Track IDs)
   * onNotFound: When the tracks are not found
   */
  @Output() onError = new EventEmitter<string>();  
  @Output() onAdd = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<string>();
  @Output() onRemoved = new EventEmitter<string[]>();
  @Output() onSwapped = new EventEmitter<string[]>();
  @Output() onNotFound = new EventEmitter<void>();

  public tracksAreLoading : boolean;
  public trackCount : number;
  public tracksAreUpdating : boolean;
  public tracksSelected : string[];
  private trackTitleSelected : string;

  public tracks : Observable<Track[]>;
  private tracksEnd : Subject<void>;

  constructor(
    private trackService : AppTrackService) { }

  ngOnInit(): void {
    this.tracksAreLoading = true;
    this.trackCount = 0;
    this.tracksSelected = [];

    this.tracksEnd = new Subject<void>();
    
    this.tracks = 
    this.trackService.retrieveTracks(
      this.tracklistId).pipe(takeUntil(this.tracksEnd));

    this.tracks.subscribe({
      next: data => {
        if (data) {
          this.trackCount = data.length;
        } else {
          this.onNotFound.emit();
        }
        this.tracksAreLoading = false;
      },
      error: () => {
        this.tracksAreLoading = false;
        this.onError.emit(AppTracklistMessages.MSG_RETRIEVE_TRACKS_FAILED);
      }
    });
  }

  ngOnDestroy() : void {
    this.tracksEnd.next();
    this.tracksEnd.complete();
  }

  addTrack() : void {
    this.onAdd.emit();
  }

  editTrack() : void {
    if (this.tracksSelected.length === 1) {
      this.onEdit.emit(this.tracksSelected[0]);
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
          this.onRemoved.emit(this.tracksSelected)
        },
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
        () => this.onSwapped.emit(this.tracksSelected),
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
      this.trackTitleSelected = trackTitle;
    else
      this.trackTitleSelected = null;
  }
}