import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../model/order';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    constructor(private httpClient: HttpClient) {
    }

    submitOrder(order: Order): Observable<Order> {
        return this.httpClient.post<Order>('http://localhost:9000/api/order',order);
    }

}
