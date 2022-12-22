import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppFocusService } from 'js-shared';
import { AppLoginService } from '../services/app-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
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
