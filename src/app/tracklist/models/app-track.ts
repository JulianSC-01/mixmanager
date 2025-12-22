import firebase from 'firebase/compat/app';
import { AppTrackBuilder } from './app-track-builder';

export class AppTrack {
  id?: string;
  artist: string;
  title: string;
  bpm: number;
  key: string;
  startTime: number;
  endTime: number;
  totalTime?: number;
  created: firebase.firestore.Timestamp;

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