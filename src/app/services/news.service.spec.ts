import { TestBed } from '@angular/core/testing';
import { NewsService } from './news.service';
import { AutoService } from './auto.service';

describe('NewsService', () => {
  let service: NewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsService);
  });

  it('should return news with all the needed information', () => {
    const news = service.getNews();
    expect(news.length).toBeGreaterThan(0);
    news.forEach(item => {
      expect(item.title).not.toBe('');
      expect(item.summary).not.toBe('');
      expect(item.sourceName).not.toBe('');
      expect(item.url.startsWith('https://')).toBe(true);
    });
  });

  it('should give every news a unique id', () => {
    const ids = service.getNews().map(item => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should write brands like the showroom does, so the "Voir nos ..." button works', () => {
    const showroomBrands = TestBed.inject(AutoService).getBrands();
    const news = service.getNews();
    // au moins une actualité sur une marque vendue par le showroom
    expect(news.some(item => showroomBrands.includes(item.brand))).toBe(true);
    // les marques ne sont jamais écrites avec des espaces en trop
    news.forEach(item => expect(item.brand).toBe(item.brand.trim()));
  });

  it('should include news about Tesla', () => {
    const tesla = service.getNews().filter(item => item.brand === 'Tesla');
    expect(tesla.length).toBeGreaterThanOrEqual(3);
  });

  it('should have both new models and general news', () => {
    const categories = service.getNews().map(item => item.category);
    expect(categories).toContain('Nouveauté');
    expect(categories).toContain('Actualité');
  });

  it('should tell when the news was last updated', () => {
    expect(service.getLastUpdate()).not.toBe('');
  });
});
