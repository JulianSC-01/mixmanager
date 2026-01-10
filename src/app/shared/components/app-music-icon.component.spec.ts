import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMusicIconComponent } from './app-music-icon.component';

describe('AppMusicIconComponent', () => {
  let component: AppMusicIconComponent;
  let fixture: ComponentFixture<AppMusicIconComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppMusicIconComponent
      ],
      providers: [
        provideExperimentalZonelessChangeDetection()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMusicIconComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
