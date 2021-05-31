import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './app-alert.component.html'
})
export class AppAlertComponent {

  @Input() message : string;
  @Input() type : string;

  constructor() { 
    this.message = null;
    this.type = 'danger';
  }

  isDangerAlert() : boolean {
    return this.type === 'danger';
  }

  isSuccessAlert() : boolean {
    return this.type === 'success';
  }
}
