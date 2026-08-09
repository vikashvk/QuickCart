import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRing } from './credit-ring';

describe('CreditRing', () => {
  let component: CreditRing;
  let fixture: ComponentFixture<CreditRing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditRing],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditRing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
