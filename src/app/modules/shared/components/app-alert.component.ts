import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './app-alert.component.html',
  styleUrls: ['./app-alert.component.css']
})
export class AppAlertComponent {

  @Input() id : string = '';
  @Input() role : string = 'alert';
  @Input() type : string = 'danger';

  isDangerAlert() : boolean {
    return this.type === 'danger';
  }

  isSuccessAlert() : boolean {
    return this.type === 'success';
  }
}