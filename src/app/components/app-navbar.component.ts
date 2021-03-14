import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppLoginService } from '../services/app-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  public isLoggingOut : boolean;

  constructor(
    public  als : AppLoginService,
    private rtr : Router) { }

  ngOnInit(): void {
    this.isLoggingOut = false;
  }

  logout() : void {
    this.isLoggingOut = true;
    this.als.logout().
    then(
      () => this.rtr.navigate(['/login'])
    ).
    finally(
      () => this.isLoggingOut = false
    )
  }
}
