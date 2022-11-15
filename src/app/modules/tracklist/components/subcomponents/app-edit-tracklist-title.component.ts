import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Tracklist, TracklistBuilder } from '../../objects/tracklist';
import { AppTracklistMessages } from '../../messages/app-tracklist-messages';
import { AppFocusService } from 'src/app/services/app-focus.service';
import { AppTracklistService } from '../../services/app-tracklist.service';

const UNTITLED_TRACKLIST : string = 'Untitled Tracklist';

@Component({
  selector: 'app-edit-tracklist-title',
  templateUrl: './app-edit-tracklist-title.component.html'
})
export class AppEditTracklistTitleComponent implements OnInit, OnDestroy {

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
   * onUpdated: When the title is updated (Emits title)
   * onNotFound: When the title is not found
   */
  @Output() onError = new EventEmitter<string>();
  @Output() onUpdated = new EventEmitter<string>();
  @Output() onNotFound = new EventEmitter<void>();

  public tracklistIsLoading : boolean;
  public isTitleBeingEdited : boolean;
  public isTitleBeingSaved : boolean;
  public tracklistTitle : string;
  public tracklistTitleToEdit : string;

  private tracklist : Observable<Tracklist>;
  private tracklistEnd : Subject<void>;

  constructor(
    private focusService : AppFocusService,
    private tracklistService : AppTracklistService) { }

  ngOnInit(): void {
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
          this.onNotFound.emit();
        }
        this.tracklistIsLoading = false;
      },
      error: () => {
        this.tracklistIsLoading = false;
        this.onError.emit(AppTracklistMessages.MSG_RETRIEVE_TITLE_FAILED)
      }
    });
  }

  ngOnDestroy() : void {
    this.tracklistEnd.next();
    this.tracklistEnd.complete();
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
      () => this.onUpdated.emit(newTracklistTitle),
      () => this.onError.emit(AppTracklistMessages.MSG_UPDATE_TITLE_FAILED)).
      finally(() => {
        this.isTitleBeingEdited = false;
        this.isTitleBeingSaved = false;
      }
    );
  }
}