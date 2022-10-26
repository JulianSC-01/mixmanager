import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSharedModule } from '../../../shared/app-shared.module';
import { AppLoginService } from 'src/app/services/app-login.service';
import { AppTrackService } from '../../services/app-track.service';
import { AppTracklistService } from '../../services/app-tracklist.service';
import { AppEditTracklistTitleComponent } from './app-edit-tracklist-title.component';
import { environment } from 'src/environments/environment';

describe('AppEditTracklistTitleComponent', () => {
  let component: AppEditTracklistTitleComponent;
  let fixture: ComponentFixture<AppEditTracklistTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AppSharedModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppEditTracklistTitleComponent
      ],
      providers: [
        AppLoginService,
        AppTracklistService,
        AppTrackService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEditTracklistTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
