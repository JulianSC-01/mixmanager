import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument, DocumentData, DocumentReference
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppTracklist, TracklistBuilder } from '../tracklist/app-tracklist';
import { AppTrackService } from './app-track.service';

const CREATION_FIELD = 'created';
const TRACKLIST_COLLECTION = 'tracklists';

@Injectable({
  providedIn: 'root'
})
export class AppTracklistService {
  private tracklist : AngularFirestoreDocument<AppTracklist>;
  private tracklistCollection : AngularFirestoreCollection<AppTracklist>;

  constructor(
    private firestoreService : AngularFirestore,
    private trackService : AppTrackService) {
  }

  retrieveTracklists() : Observable<AppTracklist[]> {
    this.tracklistCollection =
    this.firestoreService.collection<AppTracklist>(
      TRACKLIST_COLLECTION, ref => ref.orderBy(CREATION_FIELD));

    return this.tracklistCollection.snapshotChanges().
      pipe(map(actions => actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          if (data) {
            return new TracklistBuilder().
              withId(id).
              withTitle(data.title).
              withCreationDate(data.created).
              buildTracklist();
          }
      }))
    );
  }

  retrieveTracklist(
    tracklistId : string) : Observable<AppTracklist> {
    this.tracklist = this.firestoreService.doc(
      TRACKLIST_COLLECTION + '/' + tracklistId);

    return this.tracklist.snapshotChanges().
      pipe(map(snapshot => {
          const data = snapshot.payload.data();
          const id = snapshot.payload.id;
          if (data) {
            return new TracklistBuilder().
              withId(id).
              withTitle(data.title).
              withCreationDate(data.created).
              buildTracklist();
          }
      })
    );
  }

  addTracklist(
    tracklistData : DocumentData) : Promise<DocumentReference> {
    return this.firestoreService.collection(
      TRACKLIST_COLLECTION).add(tracklistData);
  }

  removeTracklist(
    tracklistId : string) : Promise<void> {
    let removeTracklistPromise = new Promise<void>(
      (resolve, reject) => {
        this.trackService.removeAllTracks(tracklistId).then(
          () => this.firestoreService.doc(
            TRACKLIST_COLLECTION + '/' + tracklistId).delete().then(
            () => resolve(), () => reject()
          ),() => reject()
        )
      }
    );

    return removeTracklistPromise;
  }

  updateTracklist(
    tracklistId : string,
    tracklistData : DocumentData) : Promise<void> {
    return this.firestoreService.doc(
      TRACKLIST_COLLECTION + '/' + tracklistId).update(tracklistData);
  }
}