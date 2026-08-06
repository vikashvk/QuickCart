import { Component, inject, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ProductService } from '../../services/product/product-service';
import { Product } from '../../model/product';
import { Order } from '../../model/order';
import { OrderService } from '../../services/order/order-service';
import { error } from 'console';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [AsyncPipe,
    JsonPipe,
    FormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {

  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly productService = inject(ProductService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  isAuthenticated = false;
  products: Array<Product> = [];
  orderFailed = false;
  orderSuccess = false;
  quantityIsNull = false;

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
        this.productService.getProducts()
          .pipe()
          .subscribe(product => {
            this.products = product;
          })
      }
    )
  }
  goToCreateProductPage() {
    this.router.navigateByUrl('/add-product');
  }
  orderProduct(product: Product, quantity: String) {
    this.oidcSecurityService.userData$.subscribe(result => {
      const userDetails = {
        email: result.userData.email,
        firstName: result.userData.firstName,
        lastName: result.userData.lastName
      };

      if (!quantity) {
        this.orderFailed = true;
        this.orderSuccess = false;
        this.quantityIsNull = true;
      }
      else {
        const order: Order = {
          skuCode: product.skuCode,
          price: product.price,
          quantity: Number(quantity),
          userDetails: userDetails
        }
        this.orderService.submitOrder(order).subscribe(() => {
          this.orderSuccess = true;
        }, error => {
          this.orderFailed = true;
        }
        )
      }
    })
  }
}
