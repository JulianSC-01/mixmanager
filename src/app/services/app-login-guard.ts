import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { AppLoginService } from './app-login.service';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AppLoginGuard implements CanActivate, CanLoad {

  constructor(
    private als : AppLoginService,
    private rtr : Router) { }
    
  canActivate() : Observable<boolean> {
    return this.loginCheck();
  }

  canLoad() : Observable<boolean> {
    return this.loginCheck();
  }

  loginCheck() : Observable<boolean> {
    return this.als.authState().pipe(
      take(1), 
      map((userAuth:firebase.User) => {
        if (userAuth)
          return true;
        else {
          this.rtr.navigate(['/login']);
          return false;
        }
      })
    )
  }
}
