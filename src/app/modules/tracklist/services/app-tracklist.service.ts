import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { AppLoginService } from 'src/app/services/app-login.service';
import { Tracklist } from '../interfaces/tracklist';
import { Track } from '../interfaces/track';
import { forkJoin, Observable } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const TRACKLIST_COLLECTION : string = 'tracklists';
const TRACK_COLLECTION : string = 'tracks';
const CREATION_FIELD : string = 'created';

@Injectable()
export class AppTracklistService {

  public recentlyAddedTrackTitle : string;
  public recentlyUpdatedTrackTitle : string;

  private tracklist : AngularFirestoreDocument<Tracklist>;
  private track : AngularFirestoreDocument<Track>;

  private tracklistCollection : AngularFirestoreCollection<Tracklist>;
  private trackCollection : AngularFirestoreCollection<Track>;

  constructor(
    private als : AppLoginService,
    private afs : AngularFirestore) { 
  }

  retrieveTracklists() : Observable<Tracklist[]> {
    this.tracklistCollection = 
    this.afs.collection<Tracklist>(
      TRACKLIST_COLLECTION, ref => ref.orderBy(CREATION_FIELD));

    return this.tracklistCollection.snapshotChanges().pipe(
      takeUntil(this.als.logoutState()),
      map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
      }))
    );
  }

  retrieveTracklist(
    tracklistId : string) : Observable<Tracklist> {
    this.tracklist = this.afs.doc(
      TRACKLIST_COLLECTION + '/' + tracklistId);

    return this.tracklist.valueChanges().pipe(
      takeUntil(this.als.logoutState()));
  }

  retrieveTracks(
    tracklistId : string) : Observable<Track[]> {
    this.trackCollection = 
    this.afs.collection<Track>(
      TRACKLIST_COLLECTION + '/' + tracklistId + '/' +
      TRACK_COLLECTION, ref => ref.orderBy(CREATION_FIELD));

    return this.trackCollection.snapshotChanges().pipe(
      takeUntil(this.als.logoutState()),
      map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
      }))
    );
  }

  retrieveTrack(
    tracklistId : string, 
    trackId : string) {
    this.track = this.afs.doc(
      TRACKLIST_COLLECTION + '/' + tracklistId + '/' +
      TRACK_COLLECTION + '/' + trackId);

    return this.track.valueChanges().pipe(
      takeUntil(this.als.logoutState()));
  }

  // -- TRACKLISTS --

  addTracklist(
    tracklistData : DocumentData) : Promise<DocumentReference> {
    return this.afs.collection(
      TRACKLIST_COLLECTION).add(tracklistData);
  }

  removeTracklist(
    tracklistId : string) : Promise<void> {
    let removeTracklistPromise = new Promise<void>(
      (resolve, reject) => {
        this.removeAllTracks(tracklistId).then(
          () => this.afs.doc(
            TRACKLIST_COLLECTION + '/' + tracklistId).delete().then(
            () => resolve(), 
            () => reject()
          ),
          () => reject()
        )
      }
    );

    return removeTracklistPromise;
  }

  updateTracklist(
    tracklistId : string, 
    tracklistData : DocumentData) : Promise<void> {
    return this.afs.doc(
      TRACKLIST_COLLECTION + '/' + tracklistId).update(tracklistData);
  }

  // -- TRACKS --

  addTrack(
    tracklistId : string, 
    trackData : DocumentData) : Promise<DocumentReference> {
    return this.afs.collection(
      TRACKLIST_COLLECTION + '/' + tracklistId + '/' + 
      TRACK_COLLECTION).add(trackData);
  }

  removeTrack(
    tracklistId : string, 
    trackId : string) : Promise<void> {
    return this.afs.doc(
      TRACKLIST_COLLECTION + '/' + tracklistId + '/' +
      TRACK_COLLECTION + '/' + trackId).delete();
  }

  removeTracks(
    tracklistId : string, 
    trackIds : string[]) : Promise<void> {
    let removeTracksPromise = new Promise<void>(
      (resolve, reject) => {
      let removePromises : Promise<void>[] = [];

      trackIds.forEach(trackId => {
        removePromises.push(
        this.removeTrack(tracklistId, trackId))
      });

      Promise.all(removePromises).then(
        () => resolve(), () => reject()
      );
    });

    return removeTracksPromise;
  }

  removeAllTracks(
    tracklistId : string) : Promise<void> {
    let removeAllPromise = new Promise<void>(
      (resolve, reject) => {
      this.trackCollection = 
      this.afs.collection<Track>(
        TRACKLIST_COLLECTION + '/' + tracklistId + '/' + 
        TRACK_COLLECTION);

      let removePromises : Promise<void>[] = [];
  
      this.trackCollection.snapshotChanges().pipe(
        take(1)).subscribe(tracks => {
          tracks.forEach(track => {
            removePromises.push(
            this.removeTrack(tracklistId, track.payload.doc.id))
          })
        });

      Promise.all(removePromises).then(
        () => resolve(), () => reject()
      );
    });

    return removeAllPromise;
  }

  updateTrack(
    tracklistId : string, 
    trackId : string, 
    trackData : DocumentData) : Promise<void> {
    return this.afs.doc(
      TRACKLIST_COLLECTION + '/' + tracklistId + '/' + 
      TRACK_COLLECTION + '/' + trackId).update(trackData);
  }

  swapTracks(
    tracklistId : string,
    trackIdFirst : string,
    trackIdSecond : string) : Promise<void> {
    let swapTracksPromise = new Promise<void>(
      (resolve, reject) => {
      forkJoin([
        this.retrieveTrack(tracklistId, trackIdFirst).pipe(take(1)), 
        this.retrieveTrack(tracklistId, trackIdSecond).pipe(take(1))]).
          pipe(take(1)).subscribe(([trackOne, trackTwo]) => {
            Promise.all([
              this.updateTrack(tracklistId, trackIdFirst, this.getCoreData(trackTwo)),
              this.updateTrack(tracklistId, trackIdSecond, this.getCoreData(trackOne))]
            ).then(() => resolve(), () => reject());
          }, () => reject())
    });

    return swapTracksPromise;
  }

  getCurrentTimestamp() : firebase.firestore.Timestamp {
    return firebase.firestore.Timestamp.fromDate(new Date());
  }

  // --

  private getCoreData(track : Track) : any {
    return {
        artist: track.artist,
        title: track.title,
        bpm: track.bpm,
        key: track.key
    };
  }
}
