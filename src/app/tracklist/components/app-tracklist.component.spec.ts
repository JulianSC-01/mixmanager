import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AppTracklistService } from 'src/app/services/app-tracklist.service';
import { AppTracklistComponent } from './app-tracklist.component';

describe('AppTracklistComponent', () => {
  let component: AppTracklistComponent;
  let tracklistService: AppTracklistService;

  let fixture: ComponentFixture<AppTracklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppTracklistComponent,
        FormsModule
      ],
      providers: [
        provideRouter([])
      ],
    })
    .compileComponents();

    fixture =
      TestBed.createComponent(AppTracklistComponent);

    tracklistService =
      TestBed.inject(AppTracklistService);

    spyOn(tracklistService, 'retrieveTracklists').
      and.returnValue(of([]));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});