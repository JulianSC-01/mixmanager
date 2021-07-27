import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppFocusService } from 'src/app/services/app-focus.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements AfterViewInit {

  @ViewChild('header') header : ElementRef;

  constructor(
    private focusService : AppFocusService,
    private titleService : Title) { }

  ngAfterViewInit() : void {
    this.focusService.focusNavbar();
    this.titleService.setTitle(this.header.nativeElement.innerText);
  }
}