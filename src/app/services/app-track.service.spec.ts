import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from "vitest";
import { AppTrackService } from './app-track.service';

describe('AppTrackService', () => {
  let service: AppTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(AppTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
