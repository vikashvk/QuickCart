import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartLine } from '../../core/models/models';
import { formatHM } from '../../core/format.time';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-drawer',
  imports: [CommonModule],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css',
})
export class CartDrawer {
    @Input() open = false;
  @Input() lines: CartLine[] = [];
  @Input() remainingSeconds = 0;
  @Output() closed = new EventEmitter<void>();
  @Output() removeLine = new EventEmitter<string>();
  @Output() checkout = new EventEmitter<void>();

  fmt = formatHM;

  get total(): number {
    return this.lines.reduce((s, l) => s + l.product.priceSeconds * l.qty, 0);
  }

  get canCheckout(): boolean {
    return this.lines.length > 0 && this.total <= this.remainingSeconds;
  }

  get remainingAfter(): number {
    return this.remainingSeconds - this.total;
  }

}
