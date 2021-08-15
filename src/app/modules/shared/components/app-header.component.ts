import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppFocusService } from 'src/app/services/app-focus.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styles: ['h1 { outline: none; }']
})
export class AppHeaderComponent implements AfterViewInit {

  @ViewChild('header') header : ElementRef;

  constructor(
    private focusService : AppFocusService,
    private titleService : Title) { }

  ngAfterViewInit() : void {
    this.focusService.focusMainHeader();
    this.titleService.setTitle(this.header.nativeElement.innerText);
  }
}