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
    if (isNaN(totalSeconds) || totalSeconds < 0) {
      return [0, 0, 0];
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
    if (!Array.isArray(hoursMinutesSeconds) || 
        hoursMinutesSeconds.length !== 3) {
      return 0;
    }

    let clonedHHMMSS = 
      Object.assign([], hoursMinutesSeconds);

    let trackHours = clonedHHMMSS[0];
    if (isNaN(trackHours) || trackHours < 0) {
      trackHours = 0;
    } else if (trackHours > 99) {
      trackHours = 99;
    } else {
      trackHours = Math.floor(trackHours);
    }

    let trackMinutes = clonedHHMMSS[1];
    if (isNaN(trackMinutes) || trackMinutes < 0) {
      trackMinutes = 0;
    } else if (trackMinutes > 59) {
      trackMinutes = 59;
    } else {
      trackMinutes = Math.floor(trackMinutes);
    }

    let trackSeconds = clonedHHMMSS[2];
    if (isNaN(trackSeconds) || trackSeconds < 0) {
      trackSeconds = 0;
    } else if (trackSeconds > 59) {
      trackSeconds = 59;
    } else {
      trackSeconds = Math.floor(trackSeconds);
    }

    return ((3600 * trackHours) + (60 * trackMinutes) + trackSeconds);
  }
}