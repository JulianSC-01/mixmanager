import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from "vitest";
import { AppMusicIconComponent } from './app-music-icon.component';

describe('AppMusicIconComponent', () => {
  let component: AppMusicIconComponent;
  let fixture: ComponentFixture<AppMusicIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppMusicIconComponent
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
