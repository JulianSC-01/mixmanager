import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppDeleteIconComponent } from './app-delete-icon.component';

describe('AppDeleteIconComponent', () => {
  let component: AppDeleteIconComponent;
  let fixture: ComponentFixture<AppDeleteIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppDeleteIconComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDeleteIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
