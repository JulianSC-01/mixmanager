import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from 'js-shared';

@Component({
  imports: [
    PageHeaderComponent,
    RouterLink
  ],
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './app-not-found.component.html'
})
export class AppNotFoundComponent {
  constructor() { }
}