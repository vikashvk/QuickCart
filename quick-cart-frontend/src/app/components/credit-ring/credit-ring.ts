import { Component, Input } from '@angular/core';
import { formatHM } from '../../core/format.time';

@Component({
  selector: 'app-credit-ring',
  imports: [],
  templateUrl: './credit-ring.html',
  styleUrl: './credit-ring.css',
})
export class CreditRing {
  @Input() remainingSeconds = 0;
  @Input() allowanceSeconds = 86400;

  readonly radius = 20;
  readonly circumference = 2 * Math.PI * this.radius;

  get pct(): number {
    return Math.max(0, Math.min(1, this.remainingSeconds / this.allowanceSeconds));
  }

  get dashOffset(): number {
    return this.circumference * (1 - this.pct);
  }

  get label(): string {
    return formatHM(this.remainingSeconds);
  }

  get isLow(): boolean {
    return this.pct < 0.15;
  }
}
