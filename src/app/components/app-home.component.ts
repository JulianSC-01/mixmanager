import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from 'js-shared';

@Component({
  imports: [
    PageHeaderComponent,
    RouterLink
  ],
  selector: 'app-home',
  standalone: true,
  templateUrl: './app-home.component.html'
})
export class AppHomeComponent {
  constructor() { }
}