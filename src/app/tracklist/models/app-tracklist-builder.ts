import firebase from 'firebase/compat/app';
import { AppTracklist } from "./app-tracklist";

export class AppTracklistBuilder {
  id: string;
  title: string;
  created: firebase.firestore.Timestamp;

  withId(id: string) {
    this.id  = id;
    return this;
  }

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withCreationDate(created: firebase.firestore.Timestamp) {
    this.created = created;
    return this;
  }

  buildTracklist() {
    return new AppTracklist(this);
  }
}