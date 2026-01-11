import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppAddIconComponent } from './app-add-icon.component';

describe('AppAddIconComponent', () => {
  let component: AppAddIconComponent;
  let fixture: ComponentFixture<AppAddIconComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppAddIconComponent
      ],
      providers: [
        provideExperimentalZonelessChangeDetection()
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
