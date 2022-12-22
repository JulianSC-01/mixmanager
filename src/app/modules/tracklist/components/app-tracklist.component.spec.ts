import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppFocusService } from 'js-shared';
import { AppLoginService } from 'src/app/services/app-login.service';
import { AppSharedModule } from '../../shared/app-shared.module';
import { AppTracklistComponent } from './app-tracklist.component';
import { AppTracklistService } from '../services/app-tracklist.service';
import { AppTrackService } from '../services/app-track.service';
import { environment } from 'src/environments/environment';

describe('AppTracklistComponent', () => {
  let component: AppTracklistComponent;
  let fixture: ComponentFixture<AppTracklistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AppSharedModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppTracklistComponent
      ],
      providers: [
        AppFocusService,
        AppLoginService,
        AppTracklistService,
        AppTrackService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTracklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});