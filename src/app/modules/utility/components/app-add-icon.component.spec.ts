import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppAddIconComponent } from './app-add-icon.component';

describe('AppAddIconComponent', () => {
  let component: AppAddIconComponent;
  let fixture: ComponentFixture<AppAddIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAddIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
