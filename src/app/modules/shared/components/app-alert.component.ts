import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './app-alert.component.html'
})
export class AppAlertComponent implements OnInit {

  @Input() message : string;
  @Input() type : string;

  constructor() { 
    this.message = null;
    this.type = 'danger';
  }

  ngOnInit(): void {
  }

  isDangerAlert() : boolean {
    return this.type === 'danger';
  }

  isSuccessAlert() : boolean {
    return this.type === 'success';
  }
}
