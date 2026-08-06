import { HttpClient } from '@angular/common/http';
import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../model/product';

@Service()
export class ProductService {
    constructor(private httpClient: HttpClient) {
    }

    getProducts(): Observable<Array<Product>> {
        return this.httpClient.get<Array<Product>>('http://localhost:9000/api/product');
    }

    createProduct(product: Product): Observable<Product> {
        return this.httpClient.post<Product>('http://localhost:9000/api/product',product)
    }

}
