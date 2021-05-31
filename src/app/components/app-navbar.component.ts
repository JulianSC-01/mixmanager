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
    public loginService : AppLoginService,
    private router : Router) { }

  ngOnInit(): void {
    this.isLoggingOut = false;
  }

  logout() : void {
    this.isLoggingOut = true;
    this.router.navigate(['/login']);
    this.loginService.logout().finally(() => this.isLoggingOut = false);
  }
}
