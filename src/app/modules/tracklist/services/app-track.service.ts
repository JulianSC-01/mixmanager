import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore} from '@angular/fire/firestore';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { forkJoin, Observable } from 'rxjs';
import { takeUntil, map, take } from 'rxjs/operators';
import { AppLoginService } from 'src/app/services/app-login.service';
import { Track } from '../interfaces/track';

const CREATION_FIELD = 'created';
const TRACK_COLLECTION = 'tracks';
const TRACKLIST_COLLECTION = 'tracklists';

@Injectable()
export class AppTrackService {
  private track : AngularFirestoreDocument<Track>;
  private trackCollection : AngularFirestoreCollection<Track>;

  public recentlyAddedTrackTitle : string;
  public recentlyUpdatedTrackTitle : string;

  constructor(
    private firestoreService : AngularFirestore,
    private loginService : AppLoginService) { 
  }

  retrieveTracks(
    tracklistId : string) : Observable<Track[]> {
    this.trackCollection = 
    this.firestoreService.collection<Track>(
      TRACKLIST_COLLECTION + '/' + tracklistId + '/' +
      TRACK_COLLECTION, ref => ref.orderBy(CREATION_FIELD));

    return this.trackCollection.snapshotChanges().pipe(
      takeUntil(this.loginService.logoutState()),
      map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
      }))
    );
  }

  retrieveTrack(
    tracklistId : string, 
    trackId : string) : Observable<Track> {
    this.track = this.firestoreService.doc(
      TRACKLIST_COLLECTION + '/' + tracklistId + '/' + TRACK_COLLECTION + '/' + trackId);

    return this.track.valueChanges().pipe(
      takeUntil(this.loginService.logoutState()));
  }

  addTrack(
    tracklistId : string, 
    trackData : DocumentData) : Promise<DocumentReference> {
    return this.firestoreService.collection(
      TRACKLIST_COLLECTION + '/' + tracklistId + '/' + 
      TRACK_COLLECTION).add(trackData);
  }

  removeTrack(
    tracklistId : string, 
    trackId : string) : Promise<void> {
    return this.firestoreService.doc(
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
        removePromises.push(this.removeTrack(tracklistId, trackId))
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
      let removePromises : Promise<void>[] = [];
  
      this.retrieveTracks(tracklistId).pipe(
        take(1)).subscribe(tracks => {
          tracks.forEach(track => {
            removePromises.push(
            this.removeTrack(tracklistId, track.id))
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
    return this.firestoreService.doc(
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
              this.updateTrack(tracklistId, trackIdFirst, this.extractCoreData(trackTwo)),
              this.updateTrack(tracklistId, trackIdSecond, this.extractCoreData(trackOne))]
            ).then(() => resolve(), () => reject());
          }, () => reject())
    });

    return swapTracksPromise;
  }

  extractCoreData(track : Track) : any {
    return {
        artist: track.artist,
        title: track.title,
        bpm: track.bpm,
        key: track.key
    };
  }
}