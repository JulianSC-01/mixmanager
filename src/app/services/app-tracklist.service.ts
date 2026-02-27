import { inject, Injectable } from '@angular/core';
import {
  addDoc, collection, collectionSnapshots, deleteDoc, doc, docSnapshots,
  Firestore, orderBy, query, serverTimestamp, updateDoc
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AppTracklist } from '../tracklist/models/app-tracklist';
import { AppTracklistBuilder } from '../tracklist/models/app-tracklist-builder';
import { AppTrackService } from './app-track.service';

const TRACKLIST_COLLECTION = 'tracklists';

@Injectable({
  providedIn: 'root'
})
export class AppTracklistService {
  private readonly firestore =
    inject(Firestore);
  private readonly trackService =
    inject(AppTrackService);

  retrieveTracklists() {
    const tracklistQuery =
      query(
        collection(
          this.firestore,
          TRACKLIST_COLLECTION),
        orderBy('created'));

    return collectionSnapshots(
      tracklistQuery).pipe(
        map(snapshot =>
          snapshot.map(document => {
          const data =
            document.data() as AppTracklist;

          return new AppTracklistBuilder().
            withId(document.id).
            withTitle(data.title).
            withCreationDate(data.created).
            buildTracklist();
        })));
  }

  retrieveTracklist(
    tracklistId: string) {
    const tracklistDoc =
      doc(
        this.firestore,
        `${TRACKLIST_COLLECTION}/${tracklistId}`);

    return docSnapshots(
      tracklistDoc).pipe(
        map(document => {
          const data =
            document.data() as AppTracklist;

          if (data) {
            return new AppTracklistBuilder().
              withId(document.id).
              withTitle(data.title).
              withCreationDate(data.created).
              buildTracklist();
          }
        }));
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