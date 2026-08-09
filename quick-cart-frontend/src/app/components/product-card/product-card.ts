import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../core/models/models';
import { formatHM } from '../../core/format.time';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
   @Input({ required: true }) product!: Product;
  @Input() affordable = true;
  @Output() addToCart = new EventEmitter<Product>();

  get priceLabel(): string {
    return formatHM(this.product.priceSeconds);
  }
}
