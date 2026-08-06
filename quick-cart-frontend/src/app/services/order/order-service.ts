import { HttpClient } from '@angular/common/http';
import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../model/order';

@Service()
export class OrderService {

    constructor(private httpClient: HttpClient) {
    }

    submitOrder(order: Order): Observable<Order> {
        return this.httpClient.post<Order>('http://localhost:9000/api/order',order);
    }
}
