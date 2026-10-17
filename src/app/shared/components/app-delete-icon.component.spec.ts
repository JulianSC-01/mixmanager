import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from "vitest";
import { AppDeleteIconComponent } from './app-delete-icon.component';

describe('AppDeleteIconComponent', () => {
  let component: AppDeleteIconComponent;
  let fixture: ComponentFixture<AppDeleteIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppDeleteIconComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDeleteIconComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
