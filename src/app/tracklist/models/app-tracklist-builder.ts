import { Timestamp } from 'firebase/firestore';
import { AppTracklist } from "./app-tracklist";

export class AppTracklistBuilder {
  id = '';
  title = '';
  created?: Timestamp;

  withId(id: string) {
    this.id  = id;
    return this;
  }

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withCreationDate(created?: Timestamp) {
    this.created = created;
    return this;
  }

  buildTracklist() {
    return new AppTracklist(this);
  }
}