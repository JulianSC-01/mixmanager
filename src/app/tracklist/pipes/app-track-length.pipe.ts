import { inject, Pipe, PipeTransform } from '@angular/core';
import { AppTrackService } from 'src/app/services/app-track.service';

@Pipe({
  name: 'trackLength',
  standalone: true
})
export class AppTrackLengthPipe
  implements PipeTransform {
  private readonly trackService =
    inject(AppTrackService);

  transform(totalSeconds: number) {
    if (totalSeconds === null || totalSeconds < 0) {
      return '- -:- -:- -';
    } else {
      const hoursMinutesSeconds =
        this.trackService.trackHelper.
          getLengthHHMMSS(totalSeconds);

      let hours =
        this.formatNumber(hoursMinutesSeconds[0]);
      let minutes =
        this.formatNumber(hoursMinutesSeconds[1]);
      let seconds =
        this.formatNumber(hoursMinutesSeconds[2]);

      return `${hours}:${minutes}:${seconds}`;
    }
  }

  private formatNumber(value : number) {
    return value < 10 ? `0${value}` : value.toString();
  }
}