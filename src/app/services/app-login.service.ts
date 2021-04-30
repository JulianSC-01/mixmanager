import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {
  public ERR_INVALID_EMAIL : string = "auth/invalid-email";
  public ERR_USER_DISABLED : string = "auth/user-disabled";
  public ERR_USER_NOT_FOUND : string = "auth/user-not-found";
  public ERR_TOO_MANY_REQ : string = "auth/too-many-requests";
  public ERR_PASSWORD_ERROR : string = "auth/wrong-password";

  constructor(
    private afAuth : AngularFireAuth) { 
  }

  login(username : string, password : string) : 
    Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(username, password);
  }

  logout() : Promise<void> {
    return this.afAuth.signOut();
  }

  authState() : Observable<firebase.User> {
    return this.afAuth.authState;
  }
}
