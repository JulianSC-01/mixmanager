import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSharedModule } from 'src/app/modules/shared/app-shared.module';
import { AppLoginService } from 'src/app/services/app-login.service';
import { AppTrackService } from '../../services/app-track.service';
import { AppTracklistService } from '../../services/app-tracklist.service';
import { AppTracklistTableComponent } from './app-tracklist-table.component';
import { environment } from 'src/environments/environment';

describe('AppTracklistTableComponent', () => {
  let component: AppTracklistTableComponent;
  let fixture: ComponentFixture<AppTracklistTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AppSharedModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppTracklistTableComponent
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
    fixture = TestBed.createComponent(AppTracklistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
