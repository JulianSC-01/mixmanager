import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import firebase from 'firebase/compat/app';
import { of } from 'rxjs';
import { AppTrackService } from 'src/app/services/app-track.service';
import { AppTracklistService } from 'src/app/services/app-tracklist.service';
import { AppTracklist, TracklistBuilder } from '../app-tracklist';
import { AppEditTracklistComponent } from './app-edit-tracklist.component';

describe('AppEditTracklistComponent', () => {
  let component: AppEditTracklistComponent;
  let trackService: AppTrackService;
  let tracklistService: AppTracklistService;

  let tracklist: AppTracklist;

  let fixture: ComponentFixture<AppEditTracklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppEditTracklistComponent,
        FormsModule
      ],
      providers: [
        provideRouter([])
      ],
    })
    .compileComponents();

    fixture =
      TestBed.createComponent(AppEditTracklistComponent);

    tracklistService =
      TestBed.inject(AppTracklistService);
    trackService =
      TestBed.inject(AppTrackService);

    tracklist =
      new TracklistBuilder().
        withId('0').
        withTitle('Title').
        withCreationDate(
          firebase.firestore.Timestamp.fromDate(new Date())).
        buildTracklist();

    spyOn(tracklistService, 'retrieveTracklist').
      and.returnValue(of(tracklist));
    spyOn(trackService, 'retrieveTracks').
      and.returnValue(of([]));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(component.tracklistTitle).toEqual('Title');
  });
});