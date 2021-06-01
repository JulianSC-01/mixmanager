import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSharedModule } from '../../../shared/app-shared.module';
import { AppLoginService } from 'src/app/services/app-login.service';
import { AppTrackService } from '../../services/app-track.service';
import { AppEditTracklistTrackTableComponent } from './app-edit-tracklist-track-table.component';
import { environment } from 'src/environments/environment';

describe('AppEditTracklistTrackTableComponent', () => {
  let component: AppEditTracklistTrackTableComponent;
  let fixture: ComponentFixture<AppEditTracklistTrackTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AppSharedModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppEditTracklistTrackTableComponent
      ],
      providers: [
        AppLoginService,
        AppTrackService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEditTracklistTrackTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
