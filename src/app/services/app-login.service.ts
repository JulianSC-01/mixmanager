import { inject, Injectable, signal } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {
  private auth = inject(Auth);

  static ERR_BAD_EMAIL_FORMAT =
    'auth/invalid-email';
  static ERR_TOO_MANY_REQUESTS =
    'auth/too-many-requests';

  static MSG_TOO_MANY_REQUESTS =
    'Error: Too many requests. Try again later.';
  static MSG_INVALID_CREDENTIALS =
    'Error: The e-mail address or password is invalid.';

  readonly userLogout = signal(false);

  authentication$ = authState(this.auth);

  login(username: string, password: string) {
    return signInWithEmailAndPassword(
      this.auth, username, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
