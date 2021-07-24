import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppSharedModule } from '../modules/shared/app-shared.module';
import { AppHomeComponent } from './app-home.component';
import { AppFocusService } from '../services/app-focus.service';
import { AppLoginGuard } from '../services/app-login-guard';

describe('AppHomeComponent', () => {
  let component: AppHomeComponent;
  let fixture: ComponentFixture<AppHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppSharedModule
      ],
      declarations: [
        AppHomeComponent
      ],
      providers: [
        AppFocusService,
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
