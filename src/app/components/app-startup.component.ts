import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { AppLoginService } from '../services/app-login.service';

@Component({
  selector: 'app-startup',
  templateUrl: './app-startup.component.html'
})
export class AppStartupComponent implements OnInit {

  constructor(
    private als : AppLoginService,
    private rtr : Router) { }

  ngOnInit(): void {
    this.als.authState().pipe(
      take(1)).subscribe(
        userAuth => {
          if (userAuth)
              this.rtr.navigate(['/home']);
          else
              this.rtr.navigate(['/login']);
        }
      );
  }
}
