import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppHomeComponent } from './app-home.component';

import { AppLoginGuard } from '../services/app-login-guard';

describe('AppHomeComponent', () => {
  let component: AppHomeComponent;
  let fixture: ComponentFixture<AppHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppHomeComponent
      ],
      providers: [
        AppLoginGuard
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
