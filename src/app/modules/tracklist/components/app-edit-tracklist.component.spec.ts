import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSharedModule } from '../../shared/app-shared.module';
import { AppFocusService } from 'src/app/services/app-focus.service';
import { AppLoginService } from 'src/app/services/app-login.service';
import { AppTrackService } from '../services/app-track.service';
import { AppTracklistService } from '../services/app-tracklist.service';
import { AppEditTracklistComponent } from './app-edit-tracklist.component';
import { AppEditTracklistTitleComponent } from './subcomponents/app-edit-tracklist-title.component';
import { AppEditTracklistTrackTableComponent } from './subcomponents/app-edit-tracklist-track-table.component';
import { environment } from 'src/environments/environment';

describe('AppEditTracklistComponent', () => {
  let component: AppEditTracklistComponent;
  let fixture: ComponentFixture<AppEditTracklistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AppSharedModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppEditTracklistComponent,
        AppEditTracklistTitleComponent,
        AppEditTracklistTrackTableComponent
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
    fixture = TestBed.createComponent(AppEditTracklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
