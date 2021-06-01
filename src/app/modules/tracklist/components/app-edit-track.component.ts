import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTrackService } from '../services/app-track.service';

const ADD_TRACK_TITLE : string = 'Add track';
const EDIT_TRACK_TITLE : string = 'Edit track';

@Component({
  selector: 'app-edit-track',
  templateUrl: './app-edit-track.component.html'
})
export class AppEditTrackComponent implements OnInit {

  public trackErrorMessage : string;

  public tracklistId : string;
  public trackId : string;

  public trackFormTitle : string;

  constructor(
    private activatedRoute : ActivatedRoute,
    private trackService : AppTrackService,
    private router : Router) { 
    this.tracklistId = this.activatedRoute.snapshot.params['tracklistId'];
    this.trackId = this.activatedRoute.snapshot.params['trackId'];
  }

  ngOnInit(): void {
    if (!this.trackId) {
      this.trackFormTitle = ADD_TRACK_TITLE;
    } else {
      this.trackFormTitle = EDIT_TRACK_TITLE;
    }
  }

  setTrackNameAdded(trackTitle : string) {
    this.trackService.recentlyAddedTrackTitle = trackTitle;
    this.displayPreviousPage();
  }

  setTrackNameUpdated(trackTitle : string) {
    this.trackService.recentlyUpdatedTrackTitle = trackTitle;
    this.displayPreviousPage();
  }

  displayPreviousPage() : void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  displayNotFoundPage() : void {
    this.router.navigate(['/notfound']);
  }

  displayErrorMessage(errorMessage : string) {
    this.trackErrorMessage = errorMessage;
  }
}