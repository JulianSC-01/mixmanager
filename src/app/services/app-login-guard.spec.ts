import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from 'src/environments/environment';

import { AppLoginGuard } from './app-login-guard';
import { AppLoginService } from './app-login.service';

describe('AppLoginGuard', () => {
  let service: AppLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule
      ],
      providers: [
        AppLoginService,
        AppLoginGuard
      ]
    });
    service = TestBed.inject(AppLoginGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
