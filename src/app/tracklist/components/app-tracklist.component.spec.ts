import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AppTracklistService } from 'src/app/services/app-tracklist.service';
import { environment } from 'src/environments/environment';
import { AppTracklistComponent } from './app-tracklist.component';

describe('AppTracklistComponent', () => {
  let component: AppTracklistComponent;
  let tracklistService: AppTracklistService;

  let fixture: ComponentFixture<AppTracklistComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppTracklistComponent
      ],
      providers: [
        provideExperimentalZonelessChangeDetection(),
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

    fixture = TestBed.createComponent(AppTracklistComponent);
    component = fixture.componentInstance;

    tracklistService =
      TestBed.inject(AppTracklistService);

    spyOn(tracklistService, 'retrieveTracklists').
      and.returnValue(of([]));

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});