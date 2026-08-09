import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InventoryStatus } from '../models/models';
import { API_CONFIG } from '../api-config';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  constructor(private http: HttpClient) {}

  checkAvailability(productId: string): Observable<InventoryStatus> {
    return this.http
      .get<InventoryStatus>(`${API_CONFIG.inventoryServiceUrl}/${productId}`)
      .pipe(catchError(() => of({ productId, available: 99 })));
  }
}
