import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/models';
import { API_CONFIG } from '../api-config';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>(API_CONFIG.productServiceUrl)
      .pipe(catchError(() => of(this.fallbackProducts())));
  }

  getById(id: string): Observable<Product | undefined> {
    return this.http
      .get<Product>(`${API_CONFIG.productServiceUrl}/${id}`)
      .pipe(catchError(() => of(this.fallbackProducts().find(p => p.id === id))));
  }

  // Fallback demo data so the UI is browsable even before the backend is wired up.
  private fallbackProducts(): Product[] {
    return [
      { id: 'p1', name: 'Deep Focus Session', description: '90 minutes of distraction-free workspace access.', category: 'Focus', priceSeconds: 5400, imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400', inStock: true },
      { id: 'p2', name: 'Trail Run Coaching', description: '1:1 call with a trail running coach with Vikash.', category: 'Fitness', priceSeconds: 3600, imageUrl: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?q=80&w=400', inStock: true },
      { id: 'p3', name: 'Calisthenics Basics', description: 'Guided 45-min bodyweight strength session.', category: 'Fitness', priceSeconds: 2700, imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400', inStock: true },
      { id: 'p4', name: 'How to swing NY', description: '30 minutes of guaranteed support queue skip.', category: 'Support', priceSeconds: 1800, imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400', inStock: false },
      { id: 'p5', name: 'Office Work', description: '2 hours paired with a senior engineer mentor.', category: 'Career', priceSeconds: 7200, imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400', inStock: true },
      { id: 'p6', name: 'Recovery Lounge', description: '20 minutes premium recovery room access.', category: 'Fitness', priceSeconds: 1200, imageUrl: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?q=80&w=400', inStock: true },
    ];
  }
}
