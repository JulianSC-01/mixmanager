import { ComponentRef, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppTrackService } from '../../services/app-track.service';
import { AppTracklistService } from '../../services/app-tracklist.service';
import { AppTracklist } from '../models/app-tracklist';
import { AppTracklistBuilder } from '../models/app-tracklist-builder';
import { AppEditTracklistComponent } from './app-edit-tracklist.component';

describe('AppEditTracklistComponent', () => {
  let component: AppEditTracklistComponent;
  let componentRef: ComponentRef<AppEditTracklistComponent>;
  let fixture: ComponentFixture<AppEditTracklistComponent>;

  let trackService: AppTrackService;
  let tracklistService: AppTracklistService;

  let tracklist: AppTracklist;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppEditTracklistComponent
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideFirebaseApp(() =>
          initializeApp(
            environment.firebaseConfig)),
        provideAuth(() =>
          getAuth()),
        provideFirestore(() =>
          getFirestore()),
        provideRouter([])
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppEditTracklistComponent);
    component = fixture.componentInstance;

    tracklistService =
      TestBed.inject(AppTracklistService);
    trackService =
      TestBed.inject(AppTrackService);

    tracklist =
      new AppTracklistBuilder().
        withId('0').
        withTitle('Title').
        buildTracklist();

    spyOn(tracklistService, 'retrieveTracklist').
      and.returnValue(of(tracklist));
    spyOn(trackService, 'retrieveTracks').
      and.returnValue(of([]));

    componentRef = fixture.componentRef;
    componentRef.setInput('tracklistId', '');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(component.tracklistTitle()).toEqual('Title');
  });
});