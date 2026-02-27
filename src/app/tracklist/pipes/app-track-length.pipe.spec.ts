import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AppTrackLengthPipe } from './app-track-length.pipe';

describe('AppTrackLengthPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideFirebaseApp(() =>
          initializeApp(
            environment.firebaseConfig)),
        provideAuth(() =>
          getAuth()),
        provideFirestore(() =>
          getFirestore())
      ]
    });
  });

  it('create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const pipe = new AppTrackLengthPipe();
      expect(pipe).toBeTruthy();
    });
  });
});
