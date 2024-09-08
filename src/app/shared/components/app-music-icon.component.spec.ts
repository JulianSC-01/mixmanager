import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppMusicIconComponent } from './app-music-icon.component';

describe('AppMusicIconComponent', () => {
  let component: AppMusicIconComponent;
  let fixture: ComponentFixture<AppMusicIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMusicIconComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMusicIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
