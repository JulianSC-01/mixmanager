import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AppFocusService, SpinnerComponent } from 'js-shared';
import { AppLoginService } from '../services/app-login.service';
import { AppMusicIconComponent } from '../shared/components/app-music-icon.component';

@Component({
  imports: [
    AppMusicIconComponent,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SpinnerComponent
  ],
  selector: 'app-navbar',
  standalone: true,
  styleUrl: './app-navbar.component.css',
  templateUrl: './app-navbar.component.html'
})
export class AppNavbarComponent implements OnInit {
  public isLoggingOut : boolean;

  constructor(
    private focusService : AppFocusService,
    private router : Router,
    public loginService : AppLoginService) { }

  ngOnInit() : void {
    this.isLoggingOut = false;
  }

  skipToContent() : void {
    this.focusService.focusMainHeader();
  }

  logout() : void {
    this.isLoggingOut = true;
    this.router.navigate(['/login']);

    this.loginService.logout().then(() =>
      this.loginService.loggedOut.next(true)).finally(() =>
        this.isLoggingOut = false);
  }
}
