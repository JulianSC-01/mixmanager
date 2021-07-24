import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppFocusService {

  constructor() { }

  focusNavbar() : void {
    this.focusElement('#mainNavbarLink');
  }

  focusMainHeader() : void {
    this.focusElement('#mainHeader');
  }

  focusErrorHeader() : void {
    this.focusElement('#errorHeader');
  }

  focusElement(elementId : string) : void {
    setTimeout(() => {
      const element = <HTMLElement>document.querySelector(elementId);
      element.focus();
    }, 100);
  }
}
