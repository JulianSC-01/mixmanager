import firebase from 'firebase/compat/app';
import { AppTrack } from "./app-track";

export class AppTrackBuilder {
  id: string;
  artist: string;
  title: string;
  bpm: number;
  key: string;
  startTime: number;
  endTime: number;
  totalTime: number;
  created: firebase.firestore.Timestamp;

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

  withBPM(bpm: number) {
    this.bpm = bpm;
    return this;
  }

  withKey(key: string) {
    this.key = key;
    return this;
  }

  withStartTime(startTime: number) {
    this.startTime = startTime;
    return this;
  }

  withEndTime(endTime: number) {
    this.endTime = endTime;
    return this;
  }

  withTotalTime(totalTime: number) {
    this.totalTime = totalTime;
    return this;
  }

  withCreationDate(
    created: firebase.firestore.Timestamp) {
    this.created = created;
    return this;
  }

  buildTrack() {
    return new AppTrack(this);
  }
}