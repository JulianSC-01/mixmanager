import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {
  public ERR_INVALID_EMAIL : string = "auth/invalid-email";
  public ERR_USER_DISABLED : string = "auth/user-disabled";
  public ERR_USER_NOT_FOUND : string = "auth/user-not-found";
  public ERR_TOO_MANY_REQ : string = "auth/too-many-requests";
  public ERR_PASSWORD_ERROR : string = "auth/wrong-password";

  private logoutEmitter : Subject<void>;

  constructor(
    private afAuth : AngularFireAuth) { 
    this.logoutEmitter = new Subject<void>();
  }

  login(username : string, password : string) : 
    Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(username, password);
  }

  logout() : Promise<void> {
    this.logoutEmitter.next();
    this.logoutEmitter.complete();
    return this.afAuth.signOut();
  }

  // --

  authState() : Observable<firebase.User> {
    return this.afAuth.authState;
  }

  logoutState() : Subject<void> {
    return this.logoutEmitter;
  }
}
