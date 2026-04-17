import { Timestamp } from '@angular/fire/firestore';
import { AppTrackBuilder } from './app-track-builder';

export class AppTrack {
  id: string;
  artist: string;
  title: string;
  bpm: number | null;
  key: string;
  startTime: number | null;
  endTime: number | null;
  totalTime: number | null;
  created?: Timestamp;

  constructor(builder: AppTrackBuilder) {
    this.id = builder.id;
    this.artist = builder.artist;
    this.title = builder.title;
    this.bpm = builder.bpm;
    this.key = builder.key;
    this.startTime = builder.startTime;
    this.endTime = builder.endTime;
    this.totalTime = builder.totalTime;
    this.created = builder.created;
  }
}