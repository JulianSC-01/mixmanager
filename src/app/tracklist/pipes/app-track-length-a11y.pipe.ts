import { inject, Pipe, PipeTransform } from '@angular/core';
import { AppTrackService } from 'src/app/services/app-track.service';

@Pipe({
  name: 'trackLengthA11y',
  standalone: true
})
export class AppTrackLengthA11yPipe
  implements PipeTransform {
  private readonly trackService =
    inject(AppTrackService);

  transform(totalSeconds: number) {
    if (totalSeconds === null || totalSeconds < 0) {
      return 'undefined';
    } else {
      const hoursMinutesSeconds =
        this.trackService.trackHelper.
          getLengthHHMMSS(totalSeconds);

      let value = '';

      if (hoursMinutesSeconds[0] > 0) {
        if (hoursMinutesSeconds[0] === 1) {
          value = `${hoursMinutesSeconds[0]} hour `;
        } else {
          value = `${hoursMinutesSeconds[0]} hours `;
        }
      }
      if (hoursMinutesSeconds[1] > 0) {
        if (hoursMinutesSeconds[1] === 1) {
          value = `${value}${hoursMinutesSeconds[1]} minute `;
        } else {
          value = `${value}${hoursMinutesSeconds[1]} minutes `;
        }
      }
      if (hoursMinutesSeconds[2] > 0) {
        if (hoursMinutesSeconds[2] === 1) {
          value = `${value}${hoursMinutesSeconds[2]} second `;
        } else {
          value = `${value}${hoursMinutesSeconds[2]} seconds `;
        }
      }

      if (value === '') {
        value = '0 seconds.';
      } else {
        value = `${value.trimRight()}.`;
      }

      return value;
    }
  }
}