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
  imports: [FormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {

  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly productService = inject(ProductService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  isAuthenticated = false;
  products: Product[] = [];
  orderFailed = false;
  orderSuccess = false;
  quantityIsNull = false;

  ngOnInit(): void {
    // Authentication
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;

        if (!isAuthenticated) {
          this.router.navigateByUrl('/');
          return;
        }
        this.loadProducts();

      }
    );
  }

  // Products

  private loadProducts(): void {

    this.productService.getProducts()
      .subscribe({

        next: (products) => {
          console.log('Products received:', products);
          this.products = products;
        },

        error: (error) => {
          console.error(
            'Failed to load products:',
            error
          );
        }
      });
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
        return;
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
