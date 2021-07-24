import { AfterViewInit, Component } from '@angular/core';
import { AppFocusService } from '../services/app-focus.service';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html'
})
export class AppHomeComponent implements AfterViewInit {
  constructor(
    private focusService : AppFocusService) {
  }

  ngAfterViewInit() : void {
    this.focusService.focusMainHeader();
  }
}
