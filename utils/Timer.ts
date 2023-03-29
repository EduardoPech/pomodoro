export class Timer2 {
  private totalSeconds: number;
  private setTime: (time: string) => void;
  private internalId?: NodeJS.Timer | undefined;
  private timer: number;

  constructor(totalSeconds: number, setTime: (time: string) => void) {
    this.totalSeconds = totalSeconds;
    this.setTime = setTime;
    this.timer = totalSeconds;
  }

  convertToTime(numSeconds: number) {
    const date = new Date(numSeconds * 1000);
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  start() {
    this.internalId = setInterval(() => {
      this.timer = this.timer - 1;
      if (this.timer < 0) {
        this.timer = 0;
        // timer = duration; // uncomment this line to reset timer automatically after reaching 0
      }

      this.setTime(this.convertToTime(this.timer));
    }, 1000);
  }

  stop() {
    clearInterval(this.internalId);
  }

  reset() {
    clearInterval(this.internalId);
    this.timer = this.totalSeconds;
    this.setTime(this.convertToTime(this.timer));
  }
}
