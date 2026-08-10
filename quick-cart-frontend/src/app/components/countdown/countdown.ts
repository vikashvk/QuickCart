import { ChangeDetectorRef,Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type UrgencyLevel = 'calm' | 'warm' | 'critical';

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
  urgency: UrgencyLevel = 'calm';

  private intervalId?: ReturnType<typeof setInterval>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tick();
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private tick(): void {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    const diffMs = midnight.getTime() - now.getTime();
    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

    this.hours = Math.floor(totalSeconds / 3600);
    this.minutes = Math.floor((totalSeconds % 3600) / 60);
    this.seconds = totalSeconds % 60;
    this.urgency = this.getUrgency(totalSeconds);

    this.cdr.detectChanges(); // force the view to update this tick
  }

  private getUrgency(totalSeconds: number): UrgencyLevel {
    if (totalSeconds <= 3600) return 'critical';
    if (totalSeconds <= 14400) return 'warm';
    return 'calm';
  }

  get progressPercent(): number {
    const totalToday = this.hours * 3600 + this.minutes * 60 + this.seconds;
    return (totalToday / 86400) * 100;
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}