import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { ProductService } from './core/services/product.service';
import { TimeCreditService } from './core/services/time-credit.service';
import { CartService } from './core/services/cart.service';
import { Product, TimeCredit, CartLine } from './core/models/models';
import { formatHM } from './core/format-time';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProductGridComponent, CartDrawerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  products: Product[] = [];
  credit: TimeCredit | null = null;
  cartLines: CartLine[] = [];
  cartOpen = false;
  toast: string | null = null;

  constructor(
    private productService: ProductService,
    private creditService: TimeCreditService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(p => (this.products = p));
    this.creditService.credit$.subscribe(c => (this.credit = c));
    this.cartService.cart$.subscribe(lines => (this.cartLines = lines));

    // auto-reset the daily wallet without needing a page refresh
    setInterval(() => this.creditService.checkReset(), 30_000);
  }

  get remainingSeconds(): number {
    return this.credit?.remainingSeconds ?? 0;
  }

  onAddToCart(product: Product) {
    this.cartService.add(product);
    this.showToast(`Added ${product.name}`);
  }

  onRemoveLine(productId: string) {
    this.cartService.remove(productId);
  }

  onCheckout() {
    const total = this.cartService.totalSeconds;
    const ok = this.cartService.checkout();
    if (ok) {
      this.showToast(`Spent ${formatHM(total)} — order placed`);
      this.cartOpen = false;
    } else {
      this.showToast('Not enough time credit left today');
    }
  }

  private showToast(msg: string) {
    this.toast = msg;
    setTimeout(() => (this.toast = null), 2400);
  }
}
