import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from '../app-routing.module';
import { environment } from 'src/environments/environment';
import { AppSharedModule } from '../modules/shared/app-shared.module';
import { AppStartupComponent } from './app-startup.component';
import { AppLoginService } from '../services/app-login.service';

describe('AppStartupComponent', () => {
  let component: AppStartupComponent;
  let fixture: ComponentFixture<AppStartupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AppSharedModule,
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
