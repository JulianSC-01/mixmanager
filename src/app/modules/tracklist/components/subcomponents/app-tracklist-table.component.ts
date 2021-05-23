import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Tracklist, TracklistBuilder } from '../../objects/tracklist';
import { AppTracklistMessages } from '../../messages/app-tracklist-messages';
import { AppTracklistService } from '../../services/app-tracklist.service';
import * as firebase from 'firebase/app';

const UNTITLED_TRACKLIST : string = 'Untitled Tracklist';

@Component({
  selector: 'app-tracklist-table',
  templateUrl: './app-tracklist-table.component.html',
  styleUrls: ['./app-tracklist-table.component.css']
})
export class AppTracklistTableComponent implements OnInit, OnDestroy {

  @Output() onError = new EventEmitter<string>();
  @Output() onTracklistAdded = new EventEmitter<string>();
  @Output() onTracklistRemoved = new EventEmitter<string>();
  
  public tracklistsAreLoading : boolean;
  public tracklistCount : number;
  public tracklistIsAdding : boolean;
  public tracklistToAdd : string;

  public tracklists : Observable<Tracklist[]>;
  
  private activeSubscriptions : Subscription;

  constructor(
    private tracklistService : AppTracklistService) {
    this.activeSubscriptions = new Subscription();
  }

  ngOnInit() : void {
    this.tracklistsAreLoading = true;
    this.tracklistCount = 0;

    this.tracklists = 
    this.tracklistService.retrieveTracklists();

    this.activeSubscriptions.add(
      this.tracklists.subscribe(
        data => {
          this.tracklistCount = data.length;
          this.tracklistsAreLoading = false;
        },
        () => {
          this.onError.emit(AppTracklistMessages.MSG_RETRIEVE_TRACKLISTS_FAILED)
          this.tracklistsAreLoading = false;
        }
      )
    );
  }

  ngOnDestroy() : void {
    this.activeSubscriptions.unsubscribe();
  }

  addTracklist() : void {
    this.tracklistIsAdding = true;

    let tracklistTitle = 
    this.tracklistToAdd == null ? 
    null : this.tracklistToAdd.trim();

    if (tracklistTitle === null || tracklistTitle === '') {
        tracklistTitle = UNTITLED_TRACKLIST;
    }

    let tracklistData = 
      new TracklistBuilder().
        withTitle(tracklistTitle).
        withCreationDate(firebase.firestore.Timestamp.fromDate(new Date())).
        buildInput();

    this.tracklistService.addTracklist(
      tracklistData).then(
      () => this.onTracklistAdded.emit(tracklistData.title),
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
      () => this.onTracklistRemoved.emit(tracklistName),
      () => this.onError.emit(AppTracklistMessages.MSG_REMOVE_TRACKLIST_FAILED));
  }
}
