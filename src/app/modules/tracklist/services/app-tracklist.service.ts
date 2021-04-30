import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppTrackService } from './app-track.service';
import { Tracklist } from '../interfaces/tracklist';

const CREATION_FIELD = 'created';
const TRACKLIST_COLLECTION = 'tracklists';

@Injectable()
export class AppTracklistService {
  private tracklist : AngularFirestoreDocument<Tracklist>;
  private tracklistCollection : AngularFirestoreCollection<Tracklist>;

  constructor(
    private firestoreService : AngularFirestore,
    private trackService : AppTrackService) { 
  }

  retrieveTracklists() : Observable<Tracklist[]> {
    this.tracklistCollection = 
    this.firestoreService.collection<Tracklist>(
      TRACKLIST_COLLECTION, ref => ref.orderBy(CREATION_FIELD));

    return this.tracklistCollection.snapshotChanges().
      pipe(map(actions => actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return {id, ...data};
      }))
    );
  }

  retrieveTracklist(
    tracklistId : string) : Observable<Tracklist> {
    this.tracklist = this.firestoreService.doc(
      TRACKLIST_COLLECTION + '/' + tracklistId);

    return this.tracklist.snapshotChanges().
      pipe(map(snapshot => {
          const data = snapshot.payload.data();
          const id = snapshot.payload.id;
          return {id, ...data};
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