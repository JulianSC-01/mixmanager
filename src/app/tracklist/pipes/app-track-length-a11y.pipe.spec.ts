import { TestBed } from '@angular/core/testing';
import { AppTrackLengthA11yPipe } from './app-track-length-a11y.pipe';

describe('AppTrackLengthA11yPipe', () => {
  it('create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const pipe = new AppTrackLengthA11yPipe();
      expect(pipe).toBeTruthy();
    });
  });
});
