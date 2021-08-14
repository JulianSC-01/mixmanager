import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppFocusService } from 'src/app/services/app-focus.service';
import { AppTracklistMessages } from '../messages/app-tracklist-messages';
import { AppTrackService } from '../services/app-track.service';

@Component({
  selector: 'app-edit-tracklist',
  templateUrl: './app-edit-tracklist.component.html'
})
export class AppEditTracklistComponent implements AfterViewInit, OnDestroy {
  
  public tracklistId : string;

  public tracklistErrorMessage : string;
  public tracklistSuccessMessage : string;

  constructor(
    private activatedRoute : ActivatedRoute,
    private focusService : AppFocusService,
    private trackService : AppTrackService,
    private router : Router) {
    this.tracklistId = 
    this.activatedRoute.snapshot.params['tracklistId'];
  }

  ngAfterViewInit() : void {
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
  }

  ngOnDestroy() : void {
    this.trackService.recentlyAddedTrackTitle = null;
    this.trackService.recentlyUpdatedTrackTitle = null;
    this.trackService.recentlyRemovedTrackTitle = null;
  }

  addTrack() : void {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  editTrack(tracklistId : string) : void {
    this.router.navigate([tracklistId], { relativeTo: this.activatedRoute });
  }

  displayTitleUpdatedMessage() {
    this.displaySuccessMessage(
      AppTracklistMessages.MSG_UPDATE_TITLE_SUCCESSFUL);
  }

  displayTracksRemovedMessage(tracksRemoved : string[]) {
    if (this.trackService.recentlyRemovedTrackTitle) {
      this.displaySuccessMessage(
        AppTracklistMessages.MSG_REMOVE_SUCCESSFUL.replace('{0}', this.trackService.recentlyRemovedTrackTitle));
    } else {
      this.displaySuccessMessage(
        AppTracklistMessages.MSG_REMOVE_TRACKS_SUCCESSFUL.replace('{0}', tracksRemoved.length.toString()));
    }
  }

  displayTracksSwappedMessage(tracksSwapped : string[]) {
    this.displaySuccessMessage(
      AppTracklistMessages.MSG_SWAP_TRACKS_SUCCESSFUL.replace('{0}', tracksSwapped.length.toString()));
  }

  displayNotFoundPage() : void {
    this.router.navigate(['/notfound']);
  }

  displaySuccessMessage(successMessage : string) {
    this.tracklistSuccessMessage = successMessage;
    this.focusService.focusSuccessHeader();
  }

  displayErrorMessage(errorMessage : string) {
    this.tracklistErrorMessage = errorMessage;
    this.focusService.focusErrorHeader();
  }
}