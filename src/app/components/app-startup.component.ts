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
    private loginService : AppLoginService,
    private router : Router) { }

  ngOnInit(): void {
    this.loginService.authState().pipe(
      take(1)).subscribe(
        userAuth => {
          if (userAuth)
              this.router.navigate(['/home']);
          else
              this.router.navigate(['/login']);
        }
      );
  }
}
