import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AppTrackService } from '../../services/app-track.service';
import { AppTracklistService } from '../../services/app-tracklist.service';
import { AppTracklist } from '../models/app-tracklist';
import { AppTracklistBuilder } from '../models/app-tracklist-builder';
import { AppEditTracklistComponent } from './app-edit-tracklist.component';

describe('AppEditTracklistComponent', () => {
  let component: AppEditTracklistComponent;
  let componentRef: ComponentRef<AppEditTracklistComponent>;
  let fixture: ComponentFixture<AppEditTracklistComponent>;

  let trackService: AppTrackService;
  let tracklistService: AppTracklistService;

  let tracklist: AppTracklist;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppEditTracklistComponent
      ],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppEditTracklistComponent);
    component = fixture.componentInstance;

    tracklistService =
      TestBed.inject(AppTracklistService);
    trackService =
      TestBed.inject(AppTrackService);

    tracklist =
      new AppTracklistBuilder().
        withId('0').
        withTitle('Title').
        buildTracklist();

    vi.spyOn(tracklistService, 'retrieveTracklist').
      mockReturnValue(of(tracklist));
    vi.spyOn(trackService, 'retrieveTracks').
      mockReturnValue(of([]));

    componentRef = fixture.componentRef;
    componentRef.setInput('tracklistId', '');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(component.tracklistTitle()).
      toEqual('Title');
  });
});