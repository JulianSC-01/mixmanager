import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AppTracklistService } from './app-tracklist.service';

describe('AppTracklistService', () => {
  let service: AppTracklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ]
    });
    service = TestBed.inject(AppTracklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});