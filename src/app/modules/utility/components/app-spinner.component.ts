import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './app-spinner.component.html'
})
export class AppSpinnerComponent {

  @Input() isLarge : boolean;
  @Input() label : string;

  constructor() { 
    this.isLarge = false;
    this.label = null;
  }
}
