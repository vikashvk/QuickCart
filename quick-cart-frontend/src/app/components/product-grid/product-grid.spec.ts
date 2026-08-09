import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGrid } from './product-grid';

describe('ProductGrid', () => {
  let component: ProductGrid;
  let fixture: ComponentFixture<ProductGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
