import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AppTracklistService } from './app-tracklist.service';
import { AppTrackService } from './app-track.service';
import { environment } from 'src/environments/environment';

describe('AppTracklistService', () => {
  let service: AppTracklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        AppTracklistService,
        AppTrackService
      ]
    });
    service = TestBed.inject(AppTracklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
