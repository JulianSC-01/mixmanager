import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Tracklist, TracklistBuilder } from '../../objects/tracklist';
import { AppTracklistMessages } from '../../messages/app-tracklist-messages';
import { AppTracklistService } from '../../services/app-tracklist.service';

const UNTITLED_TRACKLIST : string = 'Untitled Tracklist';

@Component({
  selector: 'app-edit-tracklist-title',
  templateUrl: './app-edit-tracklist-title.component.html'
})
export class AppEditTracklistTitleComponent implements OnInit, OnDestroy {

  @Input() tracklistId : string;
  
  @Output() onError = new EventEmitter<string>();
  @Output() onTitleUpdated = new EventEmitter<void>();
  @Output() onTitleNotFound = new EventEmitter<void>();

  public tracklistIsLoading : boolean;
  public isTitleBeingEdited : boolean;
  public isTitleBeingSaved : boolean;
  public tracklistTitle : string;
  public tracklistTitleToEdit : string;

  private tracklist : Observable<Tracklist>;
  
  private activeSubscriptions : Subscription;

  constructor(
    private tracklistService : AppTracklistService) { 
    this.activeSubscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.tracklistIsLoading = true;
    
    this.tracklist = 
    this.tracklistService.retrieveTracklist(this.tracklistId);

    this.activeSubscriptions.add( 
      this.tracklist.subscribe(
        data => {
          if (data) {
            this.tracklistTitle = data.title;
          } else {
            this.onTitleNotFound.emit();
          }
          this.tracklistIsLoading = false;
        },
        () => {
          this.tracklistIsLoading = false;
          this.onError.emit(AppTracklistMessages.MSG_RETRIEVE_TITLE_FAILED)
        }
      )
    );
  }

  ngOnDestroy() : void {
    this.activeSubscriptions.unsubscribe();
  }

  onEditTitle() : void {
    this.tracklistTitleToEdit = this.tracklistTitle;
    this.isTitleBeingEdited = true;
  }

  onCancelEditTitle() : void {
    this.isTitleBeingEdited = false;
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
        buildInput();

    this.tracklistService.updateTracklist(
      this.tracklistId, tracklistData).then(
      () => this.onTitleUpdated.emit(),
      () => this.onError.emit(AppTracklistMessages.MSG_UPDATE_TITLE_FAILED)).
      finally(() => {
        this.isTitleBeingEdited = false;
        this.isTitleBeingSaved = false;
      }
    );
  }
}