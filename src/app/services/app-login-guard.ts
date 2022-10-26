import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppLoginService } from './app-login.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AppLoginGuard implements CanActivate {
  constructor(
    private loginService : AppLoginService,
    private router : Router) { }
    
  canActivate() : Observable<boolean> {
    return this.loginService.authState().pipe(
      take(1), 
      map((userAuth:firebase.User) => {
        if (userAuth)
          return true;
        else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }
}
