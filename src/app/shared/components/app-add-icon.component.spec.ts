import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from "vitest";
import { AppAddIconComponent } from './app-add-icon.component';

describe('AppAddIconComponent', () => {
  let component: AppAddIconComponent;
  let fixture: ComponentFixture<AppAddIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppAddIconComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAddIconComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
