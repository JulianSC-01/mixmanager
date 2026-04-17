import { inject, Injectable } from '@angular/core';
import {
  addDoc, collection, collectionSnapshots, deleteDoc, doc, docSnapshots,
  Firestore, orderBy, query, serverTimestamp, updateDoc
} from '@angular/fire/firestore';
import { combineLatest, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppTrack } from '../tracklist/models/app-track';
import { AppTrackBuilder } from '../tracklist/models/app-track-builder';
import { AppTrackHelper } from '../tracklist/util/app-track-helper';

const TRACK_COLLECTION = 'tracks';
const TRACKLIST_COLLECTION = 'tracklists';

@Injectable({
  providedIn: 'root'
})
export class AppTrackService {
  private readonly firestore =
    inject(Firestore);

  recentlyAddedTrackTitle: string | null = null;
  recentlyUpdatedTrackTitle: string | null = null;

  trackHelper =
    AppTrackHelper.getInstance();

  retrieveTracks(
    tracklistId: string) {
    const trackQuery =
      query(
        collection(
          this.firestore,
          `${TRACKLIST_COLLECTION}/` +
          `${tracklistId}/${TRACK_COLLECTION}`),
        orderBy('created'));

    return collectionSnapshots(
      trackQuery).pipe(
        map(snapshot =>
          snapshot.map(document => {
          const data =
            document.data() as AppTrack;

          return new AppTrackBuilder().
            withId(document.id).
            withArtist(data.artist).
            withTitle(data.title).
            withBPM(data.bpm).
            withKey(data.key).
            withStartTime(data.startTime).
            withEndTime(data.endTime).
            withTotalTime(
              this.trackHelper.getTrackLength(
                data.startTime, data.endTime)).
            withCreationDate(data.created).
            buildTrack();
        })));
  }

  retrieveTrack(
    tracklistId: string,
    trackId: string) {
    const trackDoc =
      doc(
        this.firestore,
        `${TRACKLIST_COLLECTION}/` +
        `${tracklistId}/${TRACK_COLLECTION}/${trackId}`);

    return docSnapshots(
      trackDoc).pipe(
        map(document => {
          const data =
            document.data() as AppTrack;

          if (data) {
            return new AppTrackBuilder().
              withId(document.id).
              withArtist(data.artist).
              withTitle(data.title).
              withBPM(data.bpm).
              withKey(data.key).
              withStartTime(data.startTime).
              withEndTime(data.endTime).
              withTotalTime(
                this.trackHelper.getTrackLength(
                  data.startTime, data.endTime)).
              withCreationDate(data.created).
              buildTrack();
          }
        }));
  }

  addTrack(
    tracklistId: string,
    track: Partial<AppTrack>) {
    const trackCollection =
      collection(
        this.firestore,
        `${TRACKLIST_COLLECTION}/` +
        `${tracklistId}/${TRACK_COLLECTION}`);

    return addDoc(
      trackCollection, {
        artist: track.artist,
        title: track.title,
        bpm: track.bpm,
        key: track.key,
        startTime: track.startTime,
        endTime: track.endTime,
        created: serverTimestamp()
      });
  }

  updateTrack(
    tracklistId: string,
    trackId: string,
    track: Partial<AppTrack>) {
    const trackDoc =
      doc(
        this.firestore,
        `${TRACKLIST_COLLECTION}/` +
        `${tracklistId}/${TRACK_COLLECTION}/${trackId}`);

    return updateDoc(
      trackDoc, track);
  }

  removeTrack(
    tracklistId: string,
    trackId: string) {
    const trackDoc =
      doc(
        this.firestore,
        `${TRACKLIST_COLLECTION}/` +
        `${tracklistId}/${TRACK_COLLECTION}/${trackId}`);

    return deleteDoc(trackDoc);
  }

  removeTracks(
    tracklistId: string,
    trackIds: string[]) {
    let removePromises:
      Promise<void>[] = [];

    trackIds.forEach(trackId => {
      removePromises.push(
        this.removeTrack(tracklistId, trackId))
    });

    return Promise.all(removePromises);
  }

  async removeAllTracks(
    tracklistId: string) {
    let removePromises:
      Promise<void>[] = [];

    try {
      const tracks =
        await firstValueFrom(
          this.retrieveTracks(tracklistId));

      tracks.forEach(track => {
        removePromises.push(
          this.removeTrack(tracklistId, track.id));
      });

      return Promise.all(removePromises);
    } catch (error) {
      return Promise.reject();
    }
  }

  async swapTracks(
    tracklistId : string,
    trackIdFirst : string,
    trackIdSecond : string) {
    try {
      const tracks =
        await firstValueFrom(
          combineLatest([
            this.retrieveTrack(
              tracklistId, trackIdFirst),
            this.retrieveTrack(
              tracklistId, trackIdSecond)
          ]));

      if (!tracks[0] ||
          !tracks[1]) {
        return Promise.reject();
      }

      return Promise.all([
        this.updateTrack(
          tracklistId, trackIdFirst, {
            artist: tracks[1].artist,
            title: tracks[1].title,
            bpm: tracks[1].bpm,
            key: tracks[1].key
          }),
        this.updateTrack(
          tracklistId, trackIdSecond, {
            artist: tracks[0].artist,
            title: tracks[0].title,
            bpm: tracks[0].bpm,
            key: tracks[0].key
          }),
      ]);
    } catch (error) {
      return Promise.reject();
    }
  }
}