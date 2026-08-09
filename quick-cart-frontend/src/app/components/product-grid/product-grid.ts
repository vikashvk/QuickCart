import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../core/models/models';
import { ProductCard } from '../product-card/product-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-grid',
  imports: [ProductCard,CommonModule],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.css',
})
export class ProductGrid {
   @Input() products: Product[] = [];
  @Input() remainingSeconds = 0;
  @Output() addToCart = new EventEmitter<Product>();

  affordable(p: Product): boolean {
    return p.priceSeconds <= this.remainingSeconds;
  }
}
