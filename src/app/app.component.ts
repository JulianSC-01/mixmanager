import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { PageFooterComponent } from 'ngx-js-shared';
import 'temporal-spec/global';
import { environment } from '../environments/environment';
import { AppNavbarComponent } from './components/app-navbar.component';

export const FIREBASE_APP =
  initializeApp(environment.firebaseConfig);

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
