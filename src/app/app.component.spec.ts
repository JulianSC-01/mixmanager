import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { environment } from "src/environments/environment";
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent
      ],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideFirebaseApp(() =>
          initializeApp(
            environment.firebaseConfig)),
        provideAuth(() =>
          getAuth()),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});