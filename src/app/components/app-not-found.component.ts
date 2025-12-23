import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from 'ngx-js-shared';

@Component({
  imports: [
    PageHeaderComponent,
    RouterLink
  ],
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './app-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNotFoundComponent {
}