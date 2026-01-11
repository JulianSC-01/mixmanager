import { Timestamp } from '@angular/fire/firestore';
import { AppTracklist } from "./app-tracklist";

export class AppTracklistBuilder {
  id: string;
  title: string;
  created: Timestamp;

  withId(id: string) {
    this.id  = id;
    return this;
  }

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withCreationDate(created: Timestamp) {
    this.created = created;
    return this;
  }

  buildTracklist() {
    return new AppTracklist(this);
  }
}