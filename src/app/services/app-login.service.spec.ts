import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';

import { environment } from 'src/environments/environment';

import { AppLoginService } from './app-login.service';

describe('AppLoginService', () => {
  let service: AppLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        AppLoginService
      ]
    });
    service = TestBed.inject(AppLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
