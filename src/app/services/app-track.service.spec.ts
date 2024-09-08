import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AppTrackService } from './app-track.service';

describe('AppTrackService', () => {
  let service: AppTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ]
    });
    service = TestBed.inject(AppTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
