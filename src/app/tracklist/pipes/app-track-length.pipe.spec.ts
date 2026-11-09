import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from "vitest";
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
