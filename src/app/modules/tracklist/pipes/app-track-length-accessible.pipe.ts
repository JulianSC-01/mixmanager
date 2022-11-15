import { Pipe, PipeTransform } from '@angular/core';
import { AppTrackHelper } from '../helpers/app-track-helper';

@Pipe({
  name: 'trackLengthAccessible'
})
export class AppTrackLengthAccessiblePipe implements PipeTransform {
  transform(totalSeconds: number): string {
    if (totalSeconds === null || totalSeconds < 0) {
      return 'undefined';
    } else {
      let hoursMinutesSeconds : number[] =
        AppTrackHelper.getInstance().getLengthHHMMSS(totalSeconds);

      let value : string = '';

      if (hoursMinutesSeconds[0] > 0) {
        if (hoursMinutesSeconds[0] === 1) {
          value = hoursMinutesSeconds[0] + ' hour ';
        } else {
          value = hoursMinutesSeconds[0] + ' hours ';
        }
      }
      if (hoursMinutesSeconds[1] > 0) {
        if (hoursMinutesSeconds[1] === 1) {
          value = value + hoursMinutesSeconds[1] + ' minute ';
        } else {
          value = value + hoursMinutesSeconds[1] + ' minutes ';
        }
      }
      if (hoursMinutesSeconds[2] > 0) {
        if (hoursMinutesSeconds[2] === 1) {
          value = value + hoursMinutesSeconds[2] + ' second ';
        } else {
          value = value + hoursMinutesSeconds[2] + ' seconds ';
        }
      }

      if (value === '') {
        value = '0 seconds.';
      } else {
        value = value.trimEnd() + '.';
      }

      return value;
    }
  }
}