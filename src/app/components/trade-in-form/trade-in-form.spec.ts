import { TestBed } from '@angular/core/testing';
import { TradeInForm } from './trade-in-form';

describe('TradeInForm', () => {
  it('should create and offer the vehicle conditions', async () => {
    await TestBed.configureTestingModule({ imports: [TradeInForm] }).compileComponents();
    const fixture = TestBed.createComponent(TradeInForm);
    fixture.detectChanges();
    expect(fixture.componentInstance.conditions.length).toBe(4);
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });
});
