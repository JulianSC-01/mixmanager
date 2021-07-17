import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './app-spinner.component.html'
})
export class AppSpinnerComponent {

  @Input() isLarge : boolean = false;
}
