import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { provideRouter } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppLoginGuard } from './app-login-guard';
import { AppLoginService } from './app-login.service';

describe('AppLoginGuard', () => {
  let service: AppLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      providers: [
        AppLoginService,
        AppLoginGuard,
        provideRouter([])
      ]
    });
    service = TestBed.inject(AppLoginGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
