import { TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { provideRouter } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './components/app-navbar.component';
import { AppLoginService } from './services/app-login.service';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        AppComponent,
        AppNavbarComponent
      ],
      providers: [
        AppLoginService,
        provideRouter([])
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});