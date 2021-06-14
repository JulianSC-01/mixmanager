import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMusicIconComponent } from './app-music-icon.component';

describe('AppMusicIconComponent', () => {
  let component: AppMusicIconComponent;
  let fixture: ComponentFixture<AppMusicIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMusicIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMusicIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
