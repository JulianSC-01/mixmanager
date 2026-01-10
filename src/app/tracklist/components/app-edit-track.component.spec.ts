import { ComponentRef, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppEditTrackComponent } from './app-edit-track.component';

describe('AppEditTrackComponent', () => {
  let component: AppEditTrackComponent;
  let componentRef: ComponentRef<AppEditTrackComponent>;
  let fixture: ComponentFixture<AppEditTrackComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppEditTrackComponent
      ],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideFirebaseApp(() =>
          initializeApp(
            environment.firebaseConfig)),
        provideAuth(() =>
          getAuth()),
        provideFirestore(() =>
          getFirestore()),
        provideRouter([])
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppEditTrackComponent);
    component = fixture.componentInstance;

    componentRef = fixture.componentRef;
    componentRef.setInput('tracklistId', 'ABC');
    componentRef.setInput('trackId', '');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});