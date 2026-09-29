import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AppTracklistService } from '../../services/app-tracklist.service';
import { AppTracklistComponent } from './app-tracklist.component';

describe('AppTracklistComponent', () => {
  let component: AppTracklistComponent;
  let tracklistService: AppTracklistService;

  let fixture: ComponentFixture<AppTracklistComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppTracklistComponent
      ],
      providers: [
        provideRouter([])
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTracklistComponent);
    component = fixture.componentInstance;

    tracklistService =
      TestBed.inject(AppTracklistService);

    spyOn(tracklistService, 'retrieveTracklists').
      and.returnValue(of([]));

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});