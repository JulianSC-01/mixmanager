import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AppLoginService } from 'src/app/services/app-login.service';
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
    private loginService : AppLoginService,
    private trackService : AppTrackService) { 
  }

  retrieveTracklists() : Observable<Tracklist[]> {
    this.tracklistCollection = 
    this.firestoreService.collection<Tracklist>(
      TRACKLIST_COLLECTION, ref => ref.orderBy(CREATION_FIELD));

    return this.tracklistCollection.snapshotChanges().pipe(
      takeUntil(this.loginService.logoutState()),
      map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
      }))
    );
  }

  retrieveTracklist(
    tracklistId : string) : Observable<Tracklist> {
    this.tracklist = this.firestoreService.doc(
      TRACKLIST_COLLECTION + '/' + tracklistId);

    return this.tracklist.valueChanges().pipe(
      takeUntil(this.loginService.logoutState()));
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