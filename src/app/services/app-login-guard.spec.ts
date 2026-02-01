import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { CanActivateFn } from '@angular/router';
import { environment } from 'src/environments/environment';
import { loginGuard } from './app-login-guard';

describe('loginGuard', () => {
  const executeGuard: CanActivateFn =
    (...guardParameters) =>
      TestBed.runInInjectionContext(() =>
        loginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideFirebaseApp(() =>
          initializeApp(
            environment.firebaseConfig)),
        provideAuth(() =>
          getAuth())
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});