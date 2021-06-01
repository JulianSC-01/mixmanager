import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppNotFoundComponent } from './app-not-found.component';

describe('AppNotFoundComponent', () => {
  let component: AppNotFoundComponent;
  let fixture: ComponentFixture<AppNotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
