import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.html',
  styleUrls: ['./countdown.css'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  hours = 0;
  minutes = 0;
  seconds = 0;
  totalSecondsLeft = 86400;

  private frameId?: number;
  private lastRenderedSecond = -1;

  constructor(private zone: NgZone) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => this.loop());
  }

  ngOnDestroy(): void {
    if (this.frameId !== undefined) cancelAnimationFrame(this.frameId);
  }

  private loop = (): void => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    const diffMs = midnight.getTime() - now.getTime();
    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

    if (totalSeconds !== this.lastRenderedSecond) {
      this.lastRenderedSecond = totalSeconds;
      this.zone.run(() => {
        this.totalSecondsLeft = totalSeconds;
        this.hours = Math.floor(totalSeconds / 3600);
        this.minutes = Math.floor((totalSeconds % 3600) / 60);
        this.seconds = totalSeconds % 60;
      });
    }

    this.frameId = requestAnimationFrame(this.loop);
  };

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  /** urgency band drives color escalation — calm -> warm -> critical */
  get urgency(): 'calm' | 'warm' | 'critical' {
    if (this.totalSecondsLeft <= 3600) return 'critical'; // under 1hr
    if (this.totalSecondsLeft <= 14400) return 'warm';     // under 4hr
    return 'calm';
  }

  get isFinalMinute(): boolean {
    return this.totalSecondsLeft <= 60;
  }
}