import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {
  public static ERR_BAD_EMAIL_FORMAT : string = "auth/invalid-email";
  public static ERR_TOO_MANY_REQUESTS : string = "auth/too-many-requests";

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
