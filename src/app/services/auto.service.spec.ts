import { TestBed } from '@angular/core/testing';
import { AutoService } from './auto.service';

describe('AutoService', () => {
  let service: AutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoService);
  });

  it('should return the cars', () => {
    expect(service.getAutos().length).toBeGreaterThan(0);
  });

  it('should return brands without duplicates', () => {
    const brands = service.getBrands();
    expect(new Set(brands).size).toBe(brands.length);
  });

  it('should give every car a gallery that starts with its main photo', () => {
    service.getAutos().forEach(auto => {
      expect(auto.photos.length).toBeGreaterThan(1);
      expect(auto.photos[0]).toBe(auto.photo);
    });
  });

  it('should compute filter options from the cars', () => {
    const options = service.getFilterOptions();
    const prices = service.getAutos().map(auto => auto.price);
    expect(options.minPrice).toBeLessThanOrEqual(Math.min(...prices));
    expect(options.maxPrice).toBeGreaterThanOrEqual(Math.max(...prices));
    expect(options.fuels).toContain('Diesel');
    expect(options.years[0]).toBeGreaterThan(options.years[options.years.length - 1]);
  });

  it('should return 3 similar cars without the car itself', () => {
    const car = service.getAutos()[0];
    const similar = service.getSimilarAutos(car);
    expect(similar.length).toBe(3);
    expect(similar.every(other => other.id !== car.id)).toBe(true);
  });

  it('should prefer the same brand or a close price', () => {
    const car = service.getAutos().find(auto => auto.brand === 'Audi')!;
    const similar = service.getSimilarAutos(car);
    expect(similar.some(other => other.brand === 'Audi')).toBe(true);
  });
});
