import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument, DocumentData, DocumentReference
} from '@angular/fire/compat/firestore';
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppTrack, TrackBuilder } from '../tracklist/app-track';

const CREATION_FIELD = 'created';
const TRACK_COLLECTION = 'tracks';
const TRACKLIST_COLLECTION = 'tracklists';

@Injectable({
  providedIn: 'root'
})
export class AppTrackService {
  private track : AngularFirestoreDocument<AppTrack>;
  private trackCollection : AngularFirestoreCollection<AppTrack>;

  public recentlyAddedTrackTitle : string;
  public recentlyUpdatedTrackTitle : string;
  public recentlyRemovedTrackTitle : string;

  constructor(
    private firestoreService : AngularFirestore) {
  }

  retrieveTracks(
    tracklistId : string) : Observable<AppTrack[]> {
    this.trackCollection =
    this.firestoreService.collection<AppTrack>(
      TRACKLIST_COLLECTION + '/' + tracklistId + '/' +
      TRACK_COLLECTION, ref => ref.orderBy(CREATION_FIELD));

    return this.trackCollection.snapshotChanges().
      pipe(map(actions => actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          if (data) {
            return new TrackBuilder().
              withId(id).
              withArtist(data.artist).
              withTitle(data.title).
              withBPM(data.bpm).
              withKey(data.key).
              withStartTime(data.startTime).
              withEndTime(data.endTime).
              withCreationDate(data.created).
              buildTrack();
          }
      }))
    );
  }

  retrieveTrack(
    tracklistId : string,
    trackId : string) : Observable<AppTrack> {
    this.track = this.firestoreService.doc(
      TRACKLIST_COLLECTION + '/' + tracklistId + '/' + TRACK_COLLECTION + '/' + trackId);

    return this.track.snapshotChanges().
      pipe(map(snapshot => {
          const data = snapshot.payload.data();
          const id = snapshot.payload.id;
          if (data) {
            return new TrackBuilder().
              withId(id).
              withArtist(data.artist).
              withTitle(data.title).
              withBPM(data.bpm).
              withKey(data.key).
              withStartTime(data.startTime).
              withEndTime(data.endTime).
              withCreationDate(data.created).
              buildTrack();
          }
      })
    );
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
        pipe(take(1)).subscribe({
          next: ([trackOne, trackTwo]) => {
            Promise.all([
              this.updateTrack(
                tracklistId, trackIdFirst, trackTwo.buildDocumentForSwap()),
              this.updateTrack(
                tracklistId, trackIdSecond, trackOne.buildDocumentForSwap())]
            ).then(() => resolve(), () => reject());
          },
          error: () => reject()
        })
      }
    );

    return swapTracksPromise;
  }
}