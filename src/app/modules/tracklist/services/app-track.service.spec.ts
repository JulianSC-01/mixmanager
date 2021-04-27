import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AppLoginService } from 'src/app/services/app-login.service';
import { environment } from 'src/environments/environment';

import { AppTrackService } from './app-track.service';
import { AppTracklistService } from './app-tracklist.service';

describe('AppTrackService', () => {
  let service: AppTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        AppLoginService,
        AppTrackService
      ]
    });
    service = TestBed.inject(AppTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
