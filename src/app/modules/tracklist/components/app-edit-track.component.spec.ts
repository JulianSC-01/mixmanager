import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppFocusService } from 'src/app/services/app-focus.service';
import { AppLoginService } from 'src/app/services/app-login.service';
import { AppTrackService } from '../services/app-track.service';
import { AppSharedModule } from '../../shared/app-shared.module';
import { AppEditTrackComponent } from './app-edit-track.component';
import { AppEditTrackInputComponent } from './subcomponents/app-edit-track-input.component';
import { environment } from 'src/environments/environment';

describe('AppEditTrackComponent', () => {
  let component: AppEditTrackComponent;
  let fixture: ComponentFixture<AppEditTrackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AppSharedModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppEditTrackComponent,
        AppEditTrackInputComponent
      ],
      providers: [
        AppFocusService,
        AppLoginService,
        AppTrackService
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
