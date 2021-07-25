import { AfterViewInit, Component } from '@angular/core';
import { AppFocusService } from 'src/app/services/app-focus.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements AfterViewInit {

  constructor(
    private focusService : AppFocusService) { }

  ngAfterViewInit() : void {
    this.focusService.focusNavbar();
  }
}