import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppDeleteIconComponent } from './app-delete-icon.component';

describe('AppDeleteIconComponent', () => {
  let component: AppDeleteIconComponent;
  let fixture: ComponentFixture<AppDeleteIconComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppDeleteIconComponent
      ],
      providers: [
        provideExperimentalZonelessChangeDetection()
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
