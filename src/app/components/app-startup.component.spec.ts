import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppLoginComponent } from './app-login.component';
import { AppStartupComponent } from './app-startup.component';

describe('AppStartupComponent', () => {
  let component: AppStartupComponent;
  let fixture: ComponentFixture<AppStartupComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppStartupComponent
      ],
      providers: [
        provideRouter([{
          path : 'login',
          component : AppLoginComponent
        }])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStartupComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
