import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FocusService, SpinnerComponent } from 'ngx-js-shared';
import { AppLoginService } from '../services/app-login.service';
import { AppMusicIconComponent } from '../shared/components/app-music-icon.component';

@Component({
  imports: [
    AppMusicIconComponent,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    SpinnerComponent
  ],
  selector: 'app-navbar',
  standalone: true,
  styleUrl: './app-navbar.component.css',
  templateUrl: './app-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarComponent {
  private readonly focusService =
    inject(FocusService);
  private readonly router =
    inject(Router);
  readonly loginService =
    inject(AppLoginService);

  readonly loggingOut =
    signal(false);

  skipToContent() {
    this.focusService.focusMainHeader();
  }

  logout() {
    this.loggingOut.set(true);

    this.loginService.logout().
      then(() =>
        this.loginService.
          userLogout.set(true)).
      finally(() => {
        this.loggingOut.set(false);
        this.router.navigate(['/login']);
      });
  }
}
