import { DocumentData } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

export class AppTrack {
  public id : string;
  public artist : string;
  public title : string;
  public bpm : number;
  public key : string;
  public startTime : number;
  public endTime : number;
  public created : firebase.firestore.Timestamp;

  constructor(builder : TrackBuilder) {
    this.id = builder.id;
    this.artist = builder.artist;
    this.title = builder.title;
    this.bpm = builder.bpm;
    this.key = builder.key;
    this.startTime = builder.startTime;
    this.endTime = builder.endTime;
    this.created = builder.created;
  }

  buildDocument() : DocumentData {
    let documentData : DocumentData = {};

    documentData.artist = this.artist;
    documentData.title = this.title;
    documentData.bpm = this.bpm;
    documentData.key = this.key;
    documentData.startTime = this.startTime;
    documentData.endTime = this.endTime;

    return documentData;
  }

  buildDocumentForSwap() : DocumentData {
    let documentData : DocumentData = {};

    documentData.artist = this.artist;
    documentData.title = this.title;
    documentData.bpm = this.bpm;
    documentData.key = this.key;

    return documentData;
  }

  getLength() : number {
    if (this.endTime === null) {
      return null;
    } else if (this.startTime === null) {
      return this.endTime;
    } else {
      return this.endTime - this.startTime;
    }
  }
}

export class TrackBuilder {
  id : string;
  artist : string;
  title : string;
  bpm : number;
  key : string;
  startTime : number;
  endTime : number;
  created : firebase.firestore.Timestamp;

  constructor() { }

  withId(id : string) : TrackBuilder {
    this.id = id;
    return this;
  }

  withArtist(artist : string) : TrackBuilder {
    this.artist = artist;
    return this;
  }

  withTitle(title : string) : TrackBuilder {
    this.title = title;
    return this;
  }

  withBPM(bpm : number) : TrackBuilder {
    this.bpm = bpm;
    return this;
  }

  withKey(key : string) : TrackBuilder {
    this.key = key;
    return this;
  }

  withStartTime(startTime : number) : TrackBuilder {
    this.startTime = startTime;
    return this;
  }

  withEndTime(endTime : number) : TrackBuilder {
    this.endTime = endTime;
    return this;
  }

  withCreationDate(created : firebase.firestore.Timestamp) : TrackBuilder {
    this.created = created;
    return this;
  }

  buildTrack() : AppTrack {
    return new AppTrack(this);
  }
}