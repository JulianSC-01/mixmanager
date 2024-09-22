import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageFooterComponent } from 'js-shared';
import { AppNavbarComponent } from './components/app-navbar.component';

@Component({
  imports: [
    AppNavbarComponent,
    PageFooterComponent,
    RouterOutlet
  ],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor () {}
}
