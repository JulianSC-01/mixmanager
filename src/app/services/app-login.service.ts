import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {
  public static ERR_INVALID_EMAIL : string = "auth/invalid-email";
  public static ERR_USER_DISABLED : string = "auth/user-disabled";
  public static ERR_USER_NOT_FOUND : string = "auth/user-not-found";
  public static ERR_TOO_MANY_REQ : string = "auth/too-many-requests";
  public static ERR_PASSWORD_ERROR : string = "auth/wrong-password";

  constructor(
    private fireAuth : AngularFireAuth) { 
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
