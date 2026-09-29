import { TestBed } from '@angular/core/testing';
import { AppTrackLengthPipe } from './app-track-length.pipe';

describe('AppTrackLengthPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const pipe = new AppTrackLengthPipe();
      expect(pipe).toBeTruthy();
    });
  });
});
