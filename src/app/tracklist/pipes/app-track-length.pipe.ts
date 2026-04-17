import { inject, Pipe, PipeTransform } from '@angular/core';
import { AppTrackService } from '../../services/app-track.service';

@Pipe({
  name: 'trackLength'
})
export class AppTrackLengthPipe
  implements PipeTransform {
  private readonly trackService =
    inject(AppTrackService);

  transform(totalSeconds: number | null) {
    const hoursMinutesSeconds =
      this.trackService.trackHelper.
        getLengthHHMMSS(totalSeconds);

    if (hoursMinutesSeconds.every(
        value => value === null)) {
      return '- -:- -:- -';
    }

    let hours =
      this.formatNumber(hoursMinutesSeconds[0]);
    let minutes =
      this.formatNumber(hoursMinutesSeconds[1]);
    let seconds =
      this.formatNumber(hoursMinutesSeconds[2]);

    return `${hours}:${minutes}:${seconds}`;
  }

  private formatNumber(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }
}