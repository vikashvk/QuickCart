import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_CONFIG } from '../api-config';
import { CartLine,Order } from '../models/models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  placeOrder(lines: CartLine[]): Observable<Order> {
    const payload = {
      lines: lines.map(l => ({ productId: l.product.id, qty: l.qty, priceSeconds: l.product.priceSeconds })),
    };
    return this.http
      .post<Order>(API_CONFIG.orderServiceUrl, payload)
      .pipe(catchError(err => throwError(() => err)));
  }
}
