export class AppTrackHelper {
  private static instance : AppTrackHelper;

  private constructor() {}

  static getInstance() : AppTrackHelper {
    if (!AppTrackHelper.instance) {
      AppTrackHelper.instance = new AppTrackHelper();
    }
    return AppTrackHelper.instance;
  }

  getLengthHHMMSS(totalSeconds : number) : number[] {
    if (totalSeconds === null ||
        totalSeconds < 0) {
      return [null, null, null];
    }

    let trackSeconds = totalSeconds;

    let trackHours =
      Math.floor(totalSeconds / 3600);
    trackSeconds =
      (trackSeconds - (trackHours * 3600));

    let trackMinutes =
      Math.floor(trackSeconds / 60);
    trackSeconds =
      (trackSeconds - (trackMinutes * 60));

    trackSeconds =
      Math.floor(trackSeconds);

    return [trackHours, trackMinutes, trackSeconds];
  }

  getLengthSeconds(hoursMinutesSeconds : number[]) : number {
    if (hoursMinutesSeconds[0] === null &&
        hoursMinutesSeconds[1] === null &&
        hoursMinutesSeconds[2] === null) {
      return null;
    }

    let clonedHHMMSS =
      Object.assign([], hoursMinutesSeconds);

    let trackHours = clonedHHMMSS[0];
    if (trackHours === null || trackHours < 0) {
      trackHours = 0;
    } else if (trackHours > 99) {
      trackHours = 99;
    } else {
      trackHours = Math.floor(trackHours);
    }

    let trackMinutes = clonedHHMMSS[1];
    if (trackMinutes === null || trackMinutes < 0) {
      trackMinutes = 0;
    } else if (trackMinutes > 59) {
      trackMinutes = 59;
    } else {
      trackMinutes = Math.floor(trackMinutes);
    }

    let trackSeconds = clonedHHMMSS[2];
    if (trackSeconds === null || trackSeconds < 0) {
      trackSeconds = 0;
    } else if (trackSeconds > 59) {
      trackSeconds = 59;
    } else {
      trackSeconds = Math.floor(trackSeconds);
    }

    return ((3600 * trackHours) + (60 * trackMinutes) + trackSeconds);
  }
}