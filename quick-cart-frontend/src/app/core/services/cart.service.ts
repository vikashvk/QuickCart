import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartLine, Product } from '../models/models';
import { TimeCreditService } from './time-credit.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private lines$ = new BehaviorSubject<CartLine[]>([]);
  readonly cart$ = this.lines$.asObservable();

  constructor(private credit: TimeCreditService) {}

  get lines(): CartLine[] {
    return this.lines$.value;
  }

  get totalSeconds(): number {
    return this.lines.reduce((sum, l) => sum + l.product.priceSeconds * l.qty, 0);
  }

  add(product: Product) {
    const existing = this.lines.find(l => l.product.id === product.id);
    if (existing) {
      existing.qty++;
      this.lines$.next([...this.lines]);
    } else {
      this.lines$.next([...this.lines, { product, qty: 1 }]);
    }
  }

  remove(productId: string) {
    this.lines$.next(this.lines.filter(l => l.product.id !== productId));
  }

  clear() {
    this.lines$.next([]);
  }

  canCheckout(): boolean {
    return this.credit.canAfford(this.totalSeconds) && this.lines.length > 0;
  }

  /** Deduct time-credit locally; returns false if insufficient balance */
  checkout(): boolean {
    if (!this.credit.spend(this.totalSeconds)) return false;
    this.clear();
    return true;
  }
}
