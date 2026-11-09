import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from "vitest";
import { AppTracklistService } from './app-tracklist.service';

describe('AppTracklistService', () => {
  let service: AppTracklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(AppTracklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
