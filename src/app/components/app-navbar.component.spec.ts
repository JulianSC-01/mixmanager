import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from 'src/environments/environment';

import { AppNavbarComponent } from './app-navbar.component';

import { AppLoginService } from '../services/app-login.service';

describe('AppNavbarComponent', () => {
  let component: AppNavbarComponent;
  let fixture: ComponentFixture<AppNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule
      ],
      declarations: [
        AppNavbarComponent
      ],
      providers: [
        AppLoginService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
