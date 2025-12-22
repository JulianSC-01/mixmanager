import firebase from 'firebase/compat/app';
import { AppTracklistBuilder } from './app-tracklist-builder';

export class AppTracklist {
  id?: string;
  title: string;
  created: firebase.firestore.Timestamp;

  constructor(builder: AppTracklistBuilder) {
    this.id = builder.id;
    this.title = builder.title;
    this.created = builder.created;
  }
}