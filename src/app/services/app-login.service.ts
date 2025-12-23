import { inject, Injectable, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {
  private readonly fireAuth =
    inject(AngularFireAuth);

  static ERR_BAD_EMAIL_FORMAT =
    'auth/invalid-email';
  static ERR_TOO_MANY_REQUESTS =
    'auth/too-many-requests';

  static MSG_TOO_MANY_REQUESTS =
    'Error: Too many requests. Try again later.';
  static MSG_INVALID_CREDENTIALS =
    'Error: The e-mail address or password is invalid.';

  readonly userLogout = signal(false);

  authentication() {
    return this.fireAuth.authState;
  }

  login(username: string, password: string) {
    return this.fireAuth.
      signInWithEmailAndPassword(username, password);
  }

  logout() {
    return this.fireAuth.signOut();
  }
}
