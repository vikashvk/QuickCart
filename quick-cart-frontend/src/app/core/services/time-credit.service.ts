import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeCredit } from '../models/models';
import { DAILY_ALLOWANCE_SECONDS } from '../api-config';

const STORAGE_KEY = 'timespend_credit_v1';

/**
 * Each user gets 24hr (86400s) of spendable "time-money" per day.
 * Unspent seconds do NOT roll over — balance resets at local midnight.
 * Swap the localStorage calls for a real wallet endpoint on order-service
 * once that's exposed.
 */
@Injectable({ providedIn: 'root' })
export class TimeCreditService {
  private state$ = new BehaviorSubject<TimeCredit>(this.loadOrInit());
  readonly credit$ = this.state$.asObservable();

  private loadOrInit(): TimeCredit {
    const raw = localStorage.getItem(STORAGE_KEY);
    const today = this.midnightTonightISO();
    if (raw) {
      const parsed: TimeCredit = JSON.parse(raw);
      if (new Date(parsed.resetsAt).getTime() > Date.now()) {
        return parsed;
      }
    }
    const fresh: TimeCredit = {
      remainingSeconds: DAILY_ALLOWANCE_SECONDS,
      dailyAllowanceSeconds: DAILY_ALLOWANCE_SECONDS,
      resetsAt: today,
    };
    this.persist(fresh);
    return fresh;
  }

  private midnightTonightISO(): string {
    const d = new Date();
    d.setHours(24, 0, 0, 0);
    return d.toISOString();
  }

  private persist(state: TimeCredit) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  get snapshot(): TimeCredit {
    return this.state$.value;
  }

  canAfford(seconds: number): boolean {
    return this.snapshot.remainingSeconds >= seconds;
  }

  spend(seconds: number): boolean {
    if (!this.canAfford(seconds)) return false;
    const next = { ...this.snapshot, remainingSeconds: this.snapshot.remainingSeconds - seconds };
    this.state$.next(next);
    this.persist(next);
    return true;
  }

  refund(seconds: number) {
    const capped = Math.min(this.snapshot.dailyAllowanceSeconds, this.snapshot.remainingSeconds + seconds);
    const next = { ...this.snapshot, remainingSeconds: capped };
    this.state$.next(next);
    this.persist(next);
  }

  /** Call periodically (e.g. every minute) to auto-reset at midnight */
  checkReset() {
    if (Date.now() >= new Date(this.snapshot.resetsAt).getTime()) {
      const fresh: TimeCredit = {
        remainingSeconds: this.snapshot.dailyAllowanceSeconds,
        dailyAllowanceSeconds: this.snapshot.dailyAllowanceSeconds,
        resetsAt: this.midnightTonightISO(),
      };
      this.state$.next(fresh);
      this.persist(fresh);
    }
  }
}
