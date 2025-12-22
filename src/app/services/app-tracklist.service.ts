import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';
import { AppTracklist } from '../tracklist/models/app-tracklist';
import { AppTracklistBuilder } from '../tracklist/models/app-tracklist-builder';
import { AppTrackService } from './app-track.service';

const TRACKLIST_COLLECTION = 'tracklists';

@Injectable({
  providedIn: 'root'
})
export class AppTracklistService {
  private readonly firestoreService =
    inject(AngularFirestore);
  private readonly trackService =
    inject(AppTrackService);

  retrieveTracklists() {
    const tracklistCollection =
      this.firestoreService.
        collection<AppTracklist>(
          TRACKLIST_COLLECTION,
          ref => ref.orderBy('created'));

    return tracklistCollection.
      snapshotChanges().pipe(
        map(actions =>
          actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;

          if (data) {
            return new AppTracklistBuilder().
              withId(id).
              withTitle(data.title).
              withCreationDate(data.created).
              buildTracklist();
          }
        })));
  }

  retrieveTracklist(
    tracklistId: string) {
    const tracklistDoc =
      this.firestoreService.doc<AppTracklist>(
        `${TRACKLIST_COLLECTION}/${tracklistId}`);

    return tracklistDoc.
      snapshotChanges().pipe(
        map(snapshot => {
          const data = snapshot.payload.data();
          const id = snapshot.payload.id;

          if (data) {
            return new AppTracklistBuilder().
              withId(id).
              withTitle(data.title).
              withCreationDate(data.created).
              buildTracklist();
          }
        }));
  }

  addTracklist(
    tracklist: Partial<AppTracklist>) {
    const tracklistCollection =
      this.firestoreService.
        collection<AppTracklist>(
          TRACKLIST_COLLECTION);

    const creationTimestamp =
      firebase.firestore.Timestamp.
        fromDate(new Date());

    return tracklistCollection.add({
      title: tracklist.title,
      created: creationTimestamp
    });
  }

  updateTracklist(
    tracklistId: string,
    tracklist: Partial<AppTracklist>) {
    const tracklistDoc =
      this.firestoreService.doc<AppTracklist>(
        `${TRACKLIST_COLLECTION}/${tracklistId}`);

    return tracklistDoc.update(tracklist);
  }

  async removeTracklist(
    tracklistId : string) {
    try {
      await this.trackService.
        removeAllTracks(tracklistId);

      const tracklistDoc =
        this.firestoreService.doc<AppTracklist>(
          `${TRACKLIST_COLLECTION}/${tracklistId}`);

      return tracklistDoc.delete();
    } catch (error) {
      return Promise.reject();
    }
  }
}