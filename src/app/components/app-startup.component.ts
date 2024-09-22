import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent, SpinnerComponent } from 'js-shared';
import { take } from 'rxjs/operators';
import { AppLoginService } from '../services/app-login.service';

@Component({
  imports: [
    PageHeaderComponent,
    SpinnerComponent
  ],
  selector: 'app-startup',
  standalone: true,
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
