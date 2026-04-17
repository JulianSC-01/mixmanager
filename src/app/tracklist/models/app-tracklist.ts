import { Timestamp } from '@angular/fire/firestore';
import { AppTracklistBuilder } from './app-tracklist-builder';

export class AppTracklist {
  id: string;
  title: string;
  created?: Timestamp;

  constructor(builder: AppTracklistBuilder) {
    this.id = builder.id;
    this.title = builder.title;
    this.created = builder.created;
  }
}