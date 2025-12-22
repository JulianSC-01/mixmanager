import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivateFn,
  Router, RouterStateSnapshot
} from '@angular/router';
import { map, take } from 'rxjs';
import { AppLoginService } from './app-login.service';

export const loginGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot) => {
  const loginService =
    inject(AppLoginService);
  const router =
    inject(Router);

  return loginService.
    authentication().pipe(
      take(1),
      map((authentication) => {
        if (authentication) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      })
    );
}