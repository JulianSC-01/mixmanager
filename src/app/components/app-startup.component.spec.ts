import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app-routing.module';
import { AppUtilityModule } from '../modules/utility/app-utility.module';
import { AppLoginService } from '../services/app-login.service';

import { AppStartupComponent } from './app-startup.component';

describe('AppStartupComponent', () => {
  let component: AppStartupComponent;
  let fixture: ComponentFixture<AppStartupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AppUtilityModule,
        AppRoutingModule
      ],
      declarations: [ 
        AppStartupComponent
      ],
      providers: [
        AppLoginService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
