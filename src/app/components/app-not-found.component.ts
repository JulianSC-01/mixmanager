import { AfterViewInit, Component } from '@angular/core';
import { AppFocusService } from '../services/app-focus.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './app-not-found.component.html'
})
export class AppNotFoundComponent implements AfterViewInit {
  constructor(
    private focusService : AppFocusService) { }

  ngAfterViewInit() : void {
    this.focusService.focusNavbar();
  }
}
