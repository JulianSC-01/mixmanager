import { TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppFooterComponent } from './components/app-footer.component';
import { AppNavbarComponent } from './components/app-navbar.component';
import { AppLoginService } from './services/app-login.service';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        AppFooterComponent,
        AppNavbarComponent
      ],
      providers: [
        AppLoginService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
