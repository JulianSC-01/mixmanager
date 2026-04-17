import { Timestamp } from '@angular/fire/firestore';
import { AppTrack } from "./app-track";

export class AppTrackBuilder {
  id: string = '';
  artist: string = '';
  title: string = '';
  bpm: number | null = null;
  key: string = '';
  startTime: number | null = null;
  endTime: number | null = null;
  totalTime: number | null = null;
  created?: Timestamp;

  withId(id: string) {
    this.id = id;
    return this;
  }

  withArtist(artist: string) {
    this.artist = artist;
    return this;
  }

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withBPM(bpm: number | null) {
    this.bpm = bpm;
    return this;
  }

  withKey(key: string) {
    this.key = key;
    return this;
  }

  withStartTime(startTime: number | null) {
    this.startTime = startTime;
    return this;
  }

  withEndTime(endTime: number | null) {
    this.endTime = endTime;
    return this;
  }

  withTotalTime(totalTime: number | null) {
    this.totalTime = totalTime;
    return this;
  }

  withCreationDate(created?: Timestamp) {
    this.created = created;
    return this;
  }

  buildTrack() {
    return new AppTrack(this);
  }
}