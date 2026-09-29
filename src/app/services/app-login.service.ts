import { Injectable, signal } from '@angular/core';
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User
} from "firebase/auth";
import { Observable } from 'rxjs';
import { FIREBASE_APP } from '../../main';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {
  static ERR_BAD_EMAIL_FORMAT =
    'auth/invalid-email';
  static ERR_TOO_MANY_REQUESTS =
    'auth/too-many-requests';

  static MSG_TOO_MANY_REQUESTS =
    'Error: Too many requests. Try again later.';
  static MSG_INVALID_CREDENTIALS =
    'Error: The e-mail address or password is invalid.';

  public readonly userLogout =
    signal(false);

  private readonly auth =
    getAuth(FIREBASE_APP);

  public readonly authentication$ =
    new Observable<User | null>(subscriber => {
      return onAuthStateChanged(
        this.auth, (user) => subscriber.next(user));
    });

  login(username: string, password: string) {
    return signInWithEmailAndPassword(
      this.auth, username, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
