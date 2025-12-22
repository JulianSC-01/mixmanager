import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent, SpinnerComponent } from 'ngx-js-shared';
import { take } from 'rxjs/operators';
import { AppLoginService } from '../services/app-login.service';

@Component({
  imports: [
    PageHeaderComponent,
    SpinnerComponent
  ],
  selector: 'app-startup',
  standalone: true,
  templateUrl: './app-startup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppStartupComponent {
  private readonly loginService =
    inject(AppLoginService);
  private readonly router =
    inject(Router);

  constructor() {
    this.loginService.
      authentication().pipe(
        take(1)).subscribe(
        authentication => {
          if (authentication) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/login']);
          }
        });
  }
}
