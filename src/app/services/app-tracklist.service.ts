import { inject, Injectable } from '@angular/core';
import {
  addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot,
  orderBy, query, serverTimestamp, updateDoc
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { FIREBASE_APP } from '../app.config';
import { AppTracklist } from '../tracklist/models/app-tracklist';
import { AppTracklistBuilder } from '../tracklist/models/app-tracklist-builder';
import { AppTrackService } from './app-track.service';

const TRACKLIST_COLLECTION = 'tracklists';

@Injectable({
  providedIn: 'root'
})
export class AppTracklistService {
  private readonly trackService =
    inject(AppTrackService);

  private readonly firestore =
    getFirestore(FIREBASE_APP);

  retrieveTracklists() {
    return new Observable<AppTracklist[]>(
      subscriber => {
      const tracklistQuery =
        query(
          collection(
            this.firestore,
            TRACKLIST_COLLECTION),
          orderBy('created'));

      const unsubscribe =
        onSnapshot(tracklistQuery,
        snapshot => {
        subscriber.next(
          snapshot.docs.map(doc => {
            const data =
              doc.data() as AppTracklist;

            return new AppTracklistBuilder().
              withId(doc.id).
              withTitle(data.title).
              withCreationDate(data.created).
              buildTracklist();
          })
        );
        }, error => {
          subscriber.error(error)
        }
      );

      return () => unsubscribe;
    });
  }

  retrieveTracklist(
    tracklistId: string) {
    return new Observable<AppTracklist | undefined>(
      subscriber => {
      const tracklistDoc =
        doc(
          this.firestore,
          `${TRACKLIST_COLLECTION}/${tracklistId}`);

      const unsubscribe =
        onSnapshot(tracklistDoc,
        snapshot => {
        const data =
          snapshot.data() as AppTracklist;

        if (data) {
          subscriber.next(
            new AppTracklistBuilder().
              withId(snapshot.id).
              withTitle(data.title).
              withCreationDate(data.created).
              buildTracklist());
        } else {
          subscriber.next(
            undefined);
        }
        }, error => {
          subscriber.error(error)
        }
      );

      return () => unsubscribe;
    });
  }

  addTracklist(
    tracklist: Partial<AppTracklist>) {
    const tracklistCollection =
      collection(
        this.firestore,
        TRACKLIST_COLLECTION);

    return addDoc(
      tracklistCollection, {
        title: tracklist.title,
        created: serverTimestamp()
      });
  }

  updateTracklist(
    tracklistId: string,
    tracklist: Partial<AppTracklist>) {
    const tracklistDoc =
      doc(
        this.firestore,
        `${TRACKLIST_COLLECTION}/${tracklistId}`);

    return updateDoc(
      tracklistDoc, tracklist);
  }

  async removeTracklist(
    tracklistId : string) {
    try {
      await this.trackService.
        removeAllTracks(tracklistId);

      const tracklistDoc =
        doc(
          this.firestore,
          `${TRACKLIST_COLLECTION}/${tracklistId}`);

      return deleteDoc(tracklistDoc);
    } catch (error) {
      return Promise.reject();
    }
  }
}