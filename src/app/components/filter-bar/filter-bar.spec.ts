import { TestBed } from '@angular/core/testing';
import { FilterBar } from './filter-bar';
import { Filters } from '../../interfaces/filters';

describe('FilterBar', () => {
  let component: FilterBar;
  let lastFilters: Filters;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FilterBar] }).compileComponents();
    const fixture = TestBed.createComponent(FilterBar);
    component = fixture.componentInstance;
    component.options = {
      models: ['Q5'], colors: ['Gris'], fuels: ['Diesel'], transmissions: ['Manuelle'],
      years: [2026, 2020], minPrice: 100, maxPrice: 700,
    };
    component.ngOnInit();
    component.filtersChanged.subscribe((filters: Filters) => (lastFilters = filters));
  });

  it('should start with the full price range', () => {
    expect(component.selectedMinPrice).toBe(100);
    expect(component.selectedMaxPrice).toBe(700);
  });

  it('should push the max price up when the min price goes above it', () => {
    component.onMaxPriceChange('300');
    component.onMinPriceChange('500');
    expect(lastFilters.minPrice).toBe(500);
    expect(lastFilters.maxPrice).toBe(500);
  });

  it('should push the min price down when the max price goes below it', () => {
    component.onMinPriceChange('400');
    component.onMaxPriceChange('200');
    expect(lastFilters.minPrice).toBe(200);
    expect(lastFilters.maxPrice).toBe(200);
  });

  it('should emit the chosen criteria', () => {
    component.onFuelChange('Diesel');
    component.onYearChange('2026');
    expect(lastFilters.fuel).toBe('Diesel');
    expect(lastFilters.minYear).toBe(2026);
  });

  it('should reset everything', () => {
    component.onFuelChange('Diesel');
    component.onMinPriceChange('400');
    component.reset();
    expect(lastFilters).toEqual({
      minPrice: 100, maxPrice: 700, model: '', fuel: '', transmission: '',
      color: '', minYear: 0, sortBy: '',
    });
  });
});
