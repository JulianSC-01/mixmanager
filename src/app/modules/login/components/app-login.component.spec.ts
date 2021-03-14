import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AppUtilityModule } from '../../utility/app-utility.module';

import { AppLoginComponent } from './app-login.component';

import { AppLoginService } from 'src/app/services/app-login.service';

import { environment } from 'src/environments/environment';

describe('AppLoginComponent', () => {
  let component: AppLoginComponent;
  let fixture: ComponentFixture<AppLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AppUtilityModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppLoginComponent
      ],
      providers: [
        AppLoginService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
