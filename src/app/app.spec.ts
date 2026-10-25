import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Filters } from './interfaces/filters';

describe('App', () => {
  let app: App;

  // Des filtres "vides" : on change seulement ce qu'on veut tester
  const noFilters = (): Filters => ({
    minPrice: 0, maxPrice: 100000, model: '', fuel: '', transmission: '',
    color: '', minYear: 0, sortBy: '',
  });
  const allCars = () => [...app.newAutos, ...app.usedAutos];

  beforeEach(async () => {
    localStorage.clear();
    window.history.replaceState(null, '', '/');
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    app = TestBed.createComponent(App).componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should separate new and used cars', () => {
    expect(app.newAutos.every(auto => auto.condition === 'neuf')).toBe(true);
    expect(app.usedAutos.every(auto => auto.condition === 'occasion')).toBe(true);
    expect(app.totalCount).toBe(app.autoList.length);
  });

  it('should filter by price range', () => {
    app.onFiltersChanged({ ...noFilters(), minPrice: 200, maxPrice: 300 });
    expect(allCars().length).toBeGreaterThan(0);
    expect(allCars().every(auto => auto.price >= 200 && auto.price <= 300)).toBe(true);
    expect(app.totalCount).toBe(allCars().length);
  });

  it('should filter by fuel, transmission, color and year', () => {
    app.onFiltersChanged({ ...noFilters(), fuel: 'Diesel' });
    expect(allCars().length).toBeGreaterThan(0);
    expect(allCars().every(auto => auto.fuel === 'Diesel')).toBe(true);

    app.onFiltersChanged({ ...noFilters(), transmission: 'Manuelle' });
    expect(allCars().every(auto => auto.transmission === 'Manuelle')).toBe(true);

    app.onFiltersChanged({ ...noFilters(), color: 'Bleu' });
    expect(allCars().length).toBeGreaterThan(0);
    expect(allCars().every(auto => auto.color === 'Bleu')).toBe(true);

    app.onFiltersChanged({ ...noFilters(), minYear: 2025 });
    expect(allCars().length).toBeGreaterThan(0);
    expect(allCars().every(auto => auto.year >= 2025)).toBe(true);
  });

  it('should find nothing with impossible filters', () => {
    app.onFiltersChanged({ ...noFilters(), fuel: 'Électrique', transmission: 'Manuelle' });
    expect(app.totalCount).toBe(0);
  });

  it('should filter by brand', () => {
    app.onBrandSelected('Audi');
    expect(allCars().length).toBeGreaterThan(0);
    expect(allCars().every(auto => auto.brand === 'Audi')).toBe(true);
  });

  it('should search brands by the first letters', () => {
    app.onSearch('la');
    expect(allCars().length).toBeGreaterThan(0);
    expect(allCars().every(auto => auto.brand === 'Land Rover')).toBe(true);
  });

  it('should sort by price ascending and descending', () => {
    app.onFiltersChanged({ ...noFilters(), sortBy: 'price-asc' });
    const asc = app.newAutos.map(auto => auto.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));

    app.onFiltersChanged({ ...noFilters(), sortBy: 'price-desc' });
    const desc = app.newAutos.map(auto => auto.price);
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
  });

  it('should add and remove a favorite', () => {
    const car = app.autoList[0];
    app.toggleFavorite(car);
    expect(app.favoriteIds).toEqual([car.id]);
    app.toggleFavorite(car);
    expect(app.favoriteIds).toEqual([]);
  });

  it('should show only favorites when asked', () => {
    app.toggleFavorite(app.autoList[0]);
    app.toggleShowFavorites();
    expect(allCars().length).toBe(1);
    expect(allCars()[0].id).toBe(app.autoList[0].id);
  });

  it('should remember recently viewed cars, newest first, without duplicates', () => {
    app.selectCar(app.autoList[0]);
    app.selectCar(app.autoList[1]);
    app.selectCar(app.autoList[0]);
    expect(app.recentIds).toEqual([app.autoList[0].id, app.autoList[1].id]);
    expect(app.recentAutos.length).toBe(2);
  });

  it('should keep at most 6 recent cars', () => {
    app.autoList.slice(0, 8).forEach(car => app.selectCar(car));
    expect(app.recentIds.length).toBe(6);
  });

  it('should compute similar cars when a car is selected', () => {
    app.selectCar(app.autoList[0]);
    expect(app.similarAutos.length).toBe(3);
    expect(app.similarAutos.some(car => car.id === app.autoList[0].id)).toBe(false);
    app.closeDetails();
    expect(app.similarAutos.length).toBe(0);
    expect(app.selectedCar).toBeNull();
  });

  it('should update the page address and title when a car is opened', () => {
    app.selectCar(app.autoList[2]);
    expect(window.location.search).toBe(`?voiture=${app.autoList[2].id}`);
    expect(document.title).toContain(app.autoList[2].model);
    app.closeDetails();
    expect(window.location.search).toBe('');
    expect(document.title).toBe(app.defaultTitle);
  });

  it('should open a car directly from the address', () => {
    window.history.replaceState(null, '', '/?voiture=7');
    const other = TestBed.createComponent(App).componentInstance;
    expect(other.selectedCar?.id).toBe(7);
  });

  it('should load the car news', () => {
    expect(app.news.length).toBeGreaterThan(0);
    expect(app.newsUpdatedOn).not.toBe('');
  });

  it('should filter the catalogue when a news brand is chosen', () => {
    // jsdom (l'environnement de test) ne sait pas faire défiler la page : on remplace cette fonction
    window.HTMLElement.prototype.scrollIntoView = () => {};
    app.onNewsBrandSelected('BMW');
    expect(app.selectedBrand).toBe('BMW');
    expect(allCars().length).toBeGreaterThan(0);
    expect(allCars().every(auto => auto.brand === 'BMW')).toBe(true);
  });
});
