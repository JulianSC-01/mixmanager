import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Tracklist, TracklistBuilder } from '../../objects/tracklist';
import { AppTracklistMessages } from '../../messages/app-tracklist-messages';
import { AppTracklistService } from '../../services/app-tracklist.service';
import firebase from 'firebase/compat/app';

const UNTITLED_TRACKLIST : string = 'Untitled Tracklist';

@Component({
  selector: 'app-tracklist-table',
  templateUrl: './app-tracklist-table.component.html',
  styleUrls: ['./app-tracklist-table.component.css']
})
export class AppTracklistTableComponent implements OnInit, OnDestroy {

  /*
   * Output Emitters
   *
   * onError: On any error (Emits error message)
   * onAdded: When a tracklist is added (Emits tracklist name)
   * onRemoved: When a tracklist is removed (Emits tracklist name)
   */
  @Output() onError = new EventEmitter<string>();
  @Output() onAdded = new EventEmitter<string>();
  @Output() onRemoved = new EventEmitter<string>();
  
  public tracklistsAreLoading : boolean;
  public tracklistCount : number;
  public tracklistIsAdding : boolean;
  public tracklistToAdd : string;

  public tracklists : Observable<Tracklist[]>;
  private tracklistsEnd : Subject<void>;

  constructor(
    private tracklistService : AppTracklistService) { }

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
        this.onError.emit(AppTracklistMessages.MSG_RETRIEVE_TRACKLISTS_FAILED)
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

    let tracklistTitle = 
      this.tracklistToAdd === null ? 
        null : this.tracklistToAdd.trim();

    if (tracklistTitle === null || tracklistTitle === '') {
      tracklistTitle = UNTITLED_TRACKLIST;
    }

    let tracklistData = 
      new TracklistBuilder().
        withTitle(tracklistTitle).
        buildTracklist().
        buildDocument();

    tracklistData.created = firebase.firestore.Timestamp.fromDate(new Date());

    this.tracklistService.addTracklist(
      tracklistData).then(
      () => this.onAdded.emit(tracklistTitle),
      () => this.onError.emit(AppTracklistMessages.MSG_ADD_TRACKLIST_FAILED)).
      finally(
      () => {
        this.tracklistToAdd = null;
        this.tracklistIsAdding = false;
      }
    );
  }
  
  removeTracklist(tracklistId : string, tracklistName : string) : void {
    this.tracklistService.removeTracklist(
      tracklistId).then(
      () => this.onRemoved.emit(tracklistName),
      () => this.onError.emit(AppTracklistMessages.MSG_REMOVE_TRACKLIST_FAILED));
  }
}
