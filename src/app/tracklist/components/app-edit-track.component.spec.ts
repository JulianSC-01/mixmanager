import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppEditTrackComponent } from './app-edit-track.component';

describe('AppEditTrackComponent', () => {
  let component: AppEditTrackComponent;
  let componentRef: ComponentRef<AppEditTrackComponent>;
  let fixture: ComponentFixture<AppEditTrackComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppEditTrackComponent
      ],
      providers: [
        provideRouter([])
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppEditTrackComponent);
    component = fixture.componentInstance;

    componentRef = fixture.componentRef;
    componentRef.setInput('tracklistId', 'ABC');
    componentRef.setInput('trackId', '');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});