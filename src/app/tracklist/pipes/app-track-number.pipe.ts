import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackNumber',
  standalone: true
})
export class AppTrackNumberPipe implements PipeTransform {
  transform(value: number): string {
    return value < 10 ? '0' + value : '' + value;
  }
}
