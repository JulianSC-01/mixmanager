import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {
  public static ERR_BAD_EMAIL_FORMAT : string = 'auth/invalid-email';
  public static ERR_TOO_MANY_REQUESTS : string = 'auth/too-many-requests';

  public static MSG_LOGIN_TOO_MANY_REQUESTS =
    'Error: Too many requests. Try again later.';
  public static MSG_LOGIN_INVALID_CREDENTIALS =
    'Error: The e-mail address or password is invalid.';

  public loggedOut : Subject<boolean>;

  constructor(
    private fireAuth : AngularFireAuth) {
    this.loggedOut = new Subject<boolean>();
  }

  login(username : string, password : string) :
    Promise<firebase.auth.UserCredential> {
    return this.fireAuth.signInWithEmailAndPassword(username, password);
  }

  logout() : Promise<void> {
    return this.fireAuth.signOut();
  }

  authState() : Observable<firebase.User> {
    return this.fireAuth.authState;
  }
}
