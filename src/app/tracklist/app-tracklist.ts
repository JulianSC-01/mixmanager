import { DocumentData } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

export class AppTracklist {
  public id : string;
  public title : string;
  public created : firebase.firestore.Timestamp;

  constructor(builder : TracklistBuilder) {
    this.id = builder.id;
    this.title = builder.title;
    this.created = builder.created;
  }

  buildDocument() : DocumentData {
    let documentData : DocumentData = {};

    documentData.title = this.title;

    return documentData;
  }
}

export class TracklistBuilder {
  id : string;
  title : string;
  created : firebase.firestore.Timestamp;

  constructor() { }

  withId(id : string) : TracklistBuilder {
    this.id  = id;
    return this;
  }

  withTitle(title : string) : TracklistBuilder {
    this.title = title;
    return this;
  }

  withCreationDate(created : firebase.firestore.Timestamp) : TracklistBuilder {
    this.created = created;
    return this;
  }

  buildTracklist() : AppTracklist {
    return new AppTracklist(this);
  }
}