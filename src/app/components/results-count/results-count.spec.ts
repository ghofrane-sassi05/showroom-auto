import { TestBed } from '@angular/core/testing';
import { ResultsCount } from './results-count';

describe('ResultsCount', () => {
  function render(count: number, showingFavorites = false): HTMLElement {
    const fixture = TestBed.createComponent(ResultsCount);
    fixture.componentInstance.count = count;
    fixture.componentInstance.showingFavorites = showingFavorites;
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ResultsCount] }).compileComponents();
  });

  it('should show the plural form', () => {
    expect(render(7).textContent).toContain('7 voitures trouvées');
  });

  it('should show the singular form', () => {
    expect(render(1).textContent).toContain('1 voiture trouvée');
  });

  it('should suggest removing a filter when nothing is found', () => {
    expect(render(0).textContent).toContain("Essayez d'enlever un filtre");
  });

  it('should talk about favorites when nothing is found in favorites', () => {
    expect(render(0, true).textContent).toContain('favoris');
  });
});
