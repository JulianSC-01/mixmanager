import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppNotFoundComponent } from './app-not-found.component';

describe('AppNotFoundComponent', () => {
  let component: AppNotFoundComponent;
  let fixture: ComponentFixture<AppNotFoundComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppNotFoundComponent
      ],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppNotFoundComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
