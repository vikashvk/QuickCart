import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Countdown } from './countdown';

describe('Countdown', () => {
  let component: Countdown;
  let fixture: ComponentFixture<Countdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Countdown],
    }).compileComponents();

    fixture = TestBed.createComponent(Countdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
