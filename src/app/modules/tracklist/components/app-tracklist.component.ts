import { Component } from '@angular/core';
import { AppFocusService } from 'src/app/services/app-focus.service';
import { AppTracklistMessages } from '../messages/app-tracklist-messages';

@Component({
  selector: 'app-tracklist',
  templateUrl: './app-tracklist.component.html'
})
export class AppTracklistComponent {

  public tracklistErrorMessage : string;
  public tracklistSuccessMessage : string;

  constructor(
    private focusService : AppFocusService) {}

  displayAddMessage(tracklistName : string) {
    this.displaySuccessMessage(
      AppTracklistMessages.MSG_ADD_SUCCESSFUL.replace('{0}', tracklistName));
  }

  displayRemoveMessage(tracklistName : string) {
    this.displaySuccessMessage(
      AppTracklistMessages.MSG_REMOVE_SUCCESSFUL.replace('{0}', tracklistName));
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
