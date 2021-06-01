import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AppTrackService } from './app-track.service';
import { environment } from 'src/environments/environment'

describe('AppTrackService', () => {
  let service: AppTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        AppTrackService
      ]
    });
    service = TestBed.inject(AppTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
