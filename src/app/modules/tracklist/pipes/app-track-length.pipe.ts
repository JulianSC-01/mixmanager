import { Pipe, PipeTransform } from '@angular/core';
import { AppTrackHelper } from '../helpers/app-track-helper';

@Pipe({
  name: 'trackLength'
})
export class AppTrackLengthPipe implements PipeTransform {
  transform(totalSeconds: number): string {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
      return 'invalid';
    } else {
      let hoursMinutesSeconds : number[] =
        AppTrackHelper.getInstance().getLengthHHMMSS(totalSeconds);

      let hours : string = 
        this.formatNumber(hoursMinutesSeconds[0]);
      let minutes : string = 
        this.formatNumber(hoursMinutesSeconds[1]);
      let seconds : string = 
        this.formatNumber(hoursMinutesSeconds[2]);

      return hours + ':' + minutes + ':' + seconds;
    }
  }

  private formatNumber(value : number) : string {
    return value < 10 ? '0' + value : value.toString();
  }
}