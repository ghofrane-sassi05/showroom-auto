import { TestBed } from '@angular/core/testing';
import { NewsSection } from './news-section';
import { NewsItem } from '../../interfaces/news-item';

const news: NewsItem[] = [
  { id: 1, category: 'Actualité', brand: '', dateLabel: '2026', title: 'Salon', summary: 'Texte',
    sourceName: 'Site', url: 'https://exemple.com/1' },
  { id: 2, category: 'Nouveauté', brand: 'Audi', dateLabel: '2026', title: 'Nouvelle Audi', summary: 'Texte',
    sourceName: 'Site', url: 'https://exemple.com/2' },
  { id: 3, category: 'Nouveauté', brand: 'Tesla', dateLabel: '2026', title: 'Nouvelle Tesla', summary: 'Texte',
    sourceName: 'Site', url: 'https://exemple.com/3' },
];

describe('NewsSection', () => {
  let component: NewsSection;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NewsSection] }).compileComponents();
    const fixture = TestBed.createComponent(NewsSection);
    component = fixture.componentInstance;
    component.news = news;
    component.brands = ['Audi', 'BMW'];
  });

  it('should show everything by default', () => {
    expect(component.visibleNews.length).toBe(3);
  });

  it('should filter by category with the tabs', () => {
    component.selectCategory('Nouveauté');
    expect(component.visibleNews.map(item => item.id)).toEqual([2, 3]);
    component.selectCategory('Actualité');
    expect(component.visibleNews.map(item => item.id)).toEqual([1]);
    component.selectCategory('');
    expect(component.visibleNews.length).toBe(3);
  });

  it('should only offer "Voir nos ..." for brands sold by the showroom', () => {
    expect(component.isShowroomBrand('Audi')).toBe(true);
    expect(component.isShowroomBrand('Tesla')).toBe(false);
    expect(component.isShowroomBrand('')).toBe(false);
  });

  it('should send the chosen brand to the parent', () => {
    let received = '';
    component.brandSelected.subscribe((brand: string) => (received = brand));
    component.onSeeBrand('Audi');
    expect(received).toBe('Audi');
  });

  it('should build the logo path like the brand list does', () => {
    expect(component.logoPath('Land Rover')).toBe('logos/land-rover.webp');
  });

  it('should display one card per news and open sources in a new tab', () => {
    const fixture = TestBed.createComponent(NewsSection);
    fixture.componentInstance.news = news;
    fixture.componentInstance.brands = ['Audi'];
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('.news-card').length).toBe(3);
    expect(element.querySelectorAll('.see-brand').length).toBe(1);
    const link = element.querySelector('.read-more') as HTMLAnchorElement;
    expect(link.target).toBe('_blank');
    expect(link.rel).toContain('noopener');
  });

  it('should hide a logo that cannot be loaded', () => {
    const image = document.createElement('img');
    component.hideBrokenLogo({ target: image } as unknown as Event);
    expect(image.style.display).toBe('none');
  });
});
