import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSharedModule } from '../../../shared/app-shared.module';
import { AppLoginService } from 'src/app/services/app-login.service';
import { AppTrackService } from '../../services/app-track.service';
import { AppEditTrackInputComponent } from './app-edit-track-input.component';
import { environment } from 'src/environments/environment';

describe('AppEditTrackInputComponent', () => {
  let component: AppEditTrackInputComponent;
  let fixture: ComponentFixture<AppEditTrackInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AppSharedModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppEditTrackInputComponent
      ],
      providers: [
        AppLoginService,
        AppTrackService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEditTrackInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
