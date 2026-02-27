import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppLoginComponent } from './app-login.component';
import { AppStartupComponent } from './app-startup.component';

describe('AppStartupComponent', () => {
  let component: AppStartupComponent;
  let fixture: ComponentFixture<AppStartupComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppStartupComponent
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideFirebaseApp(() =>
          initializeApp(
            environment.firebaseConfig)),
        provideAuth(() =>
          getAuth()),
        provideRouter([{
          path : 'login',
          component : AppLoginComponent
        }])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStartupComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
