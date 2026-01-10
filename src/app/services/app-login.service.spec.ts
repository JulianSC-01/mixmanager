import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AppLoginService } from './app-login.service';

describe('AppLoginService', () => {
  let service: AppLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideFirebaseApp(() =>
          initializeApp(
            environment.firebaseConfig)),
        provideAuth(() =>
          getAuth())
      ]
    });

    service = TestBed.inject(AppLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
