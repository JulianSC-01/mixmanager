import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-music-icon',
  standalone: true,
  template: `<svg aria-hidden="true" [attr.width]="width" [attr.height]="height" fill="currentColor" class="bi bi-file-earmark-music" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
               <title>{{ title }}</title>
               <path d="M11 6.64a1 1 0 0 0-1.243-.97l-1 .25A1 1 0 0 0 8 6.89v4.306A2.572 2.572 0 0 0 7 11c-.5 0-.974.134-1.338.377-.36.24-.662.628-.662 1.123s.301.883.662 1.123c.364.243.839.377 1.338.377.5 0 .974-.134 1.338-.377.36-.24.662-.628.662-1.123V8.89l2-.5V6.64z"/>
               <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
             </svg>`
})
export class AppMusicIconComponent {
  @Input() width : number = 16;
  @Input() height : number = 16;
  @Input() title : string = 'Music Note';
}