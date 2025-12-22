import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackNumber',
  standalone: true
})
export class AppTrackNumberPipe
  implements PipeTransform {
  transform(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }
}
