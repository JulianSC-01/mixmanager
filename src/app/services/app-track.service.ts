import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
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
  private readonly firestoreService =
    inject(AngularFirestore);

  recentlyAddedTrackTitle: string;
  recentlyUpdatedTrackTitle: string;

  trackHelper =
    AppTrackHelper.getInstance();

  retrieveTracks(
    tracklistId: string) {
    const trackCollection =
      this.firestoreService.collection<AppTrack>(
        `${TRACKLIST_COLLECTION}/${tracklistId}/` +
        `${TRACK_COLLECTION}`,
        ref => ref.orderBy('created'));

    return trackCollection.
      snapshotChanges().pipe(
        map(actions =>
          actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;

          if (data) {
            return new AppTrackBuilder().
              withId(id).
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
        })));
  }

  retrieveTrack(
    tracklistId: string,
    trackId: string) {
    const trackDoc =
      this.firestoreService.doc<AppTrack>(
        `${TRACKLIST_COLLECTION}/${tracklistId}/` +
        `${TRACK_COLLECTION}/${trackId}`);

    return trackDoc.
      snapshotChanges().pipe(
        map(snapshot => {
          const data = snapshot.payload.data();
          const id = snapshot.payload.id;

          if (data) {
            return new AppTrackBuilder().
              withId(id).
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
      this.firestoreService.collection<AppTrack>(
        `${TRACKLIST_COLLECTION}/${tracklistId}/` +
        `${TRACK_COLLECTION}`);

    const creationTimestamp =
      firebase.firestore.Timestamp.
        fromDate(new Date());

    return trackCollection.add({
      artist: track.artist,
      title: track.title,
      bpm: track.bpm,
      key: track.key,
      startTime: track.startTime,
      endTime: track.endTime,
      created: creationTimestamp
    });
  }

  updateTrack(
    tracklistId: string,
    trackId: string,
    track: Partial<AppTrack>) {
    const trackDoc =
      this.firestoreService.doc<AppTrack>(
        `${TRACKLIST_COLLECTION}/${tracklistId}/` +
        `${TRACK_COLLECTION}/${trackId}`);

    return trackDoc.update(track);
  }

  removeTrack(
    tracklistId: string,
    trackId: string) {
    const trackDoc =
      this.firestoreService.doc<AppTrack>(
        `${TRACKLIST_COLLECTION}/${tracklistId}/` +
        `${TRACK_COLLECTION}/${trackId}`)

    return trackDoc.delete();
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