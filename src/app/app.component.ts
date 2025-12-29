import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageFooterComponent } from 'ngx-js-shared';
import { AppNavbarComponent } from './components/app-navbar.component';

@Component({
  imports: [
    AppNavbarComponent,
    PageFooterComponent,
    RouterOutlet
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
