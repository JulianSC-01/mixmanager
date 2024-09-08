import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppEditTrackComponent } from './app-edit-track.component';

describe('AppEditTrackComponent', () => {
  let component: AppEditTrackComponent;
  let fixture: ComponentFixture<AppEditTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AppEditTrackComponent,
        ReactiveFormsModule
      ],
      providers: [
        provideRouter([])
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEditTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});