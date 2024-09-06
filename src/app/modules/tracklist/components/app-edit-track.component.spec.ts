import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { AppFocusService, FormInputNumberComponent, FormInputSelectComponent, FormInputTextComponent } from 'js-shared';
import { AppLoginService } from 'src/app/services/app-login.service';
import { environment } from 'src/environments/environment';
import { AppTrackService } from '../services/app-track.service';
import { AppEditTrackComponent } from './app-edit-track.component';

describe('AppEditTrackComponent', () => {
  let component: AppEditTrackComponent;
  let fixture: ComponentFixture<AppEditTrackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        FormInputNumberComponent,
        FormInputSelectComponent,
        FormInputTextComponent,
        ReactiveFormsModule
      ],
      declarations: [
        AppEditTrackComponent
      ],
      providers: [
        AppFocusService,
        AppLoginService,
        AppTrackService,
        provideRouter([])
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEditTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});