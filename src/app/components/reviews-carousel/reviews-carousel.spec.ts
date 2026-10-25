import { TestBed } from '@angular/core/testing';
import { ReviewsCarousel } from './reviews-carousel';

describe('ReviewsCarousel', () => {
  let component: ReviewsCarousel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReviewsCarousel] }).compileComponents();
    component = TestBed.createComponent(ReviewsCarousel).componentInstance;
  });

  it('should fill as many stars as the rating', () => {
    const filled = component.starPositions.filter(position => component.isStarFilled(position, 4));
    expect(filled.length).toBe(4);
    expect(component.isStarFilled(5, 4)).toBe(false);
  });

  it('should draw 5 star icons per review, golden ones matching the rating', () => {
    const fixture = TestBed.createComponent(ReviewsCarousel);
    fixture.componentInstance.reviews = [
      { author: 'A', city: 'Tunis', rating: 3, text: 'Test', car: 'Audi Q5', photo: 'a.svg' },
    ];
    fixture.detectChanges();
    const stars = fixture.nativeElement.querySelectorAll('.star');
    expect(stars.length).toBe(5);
    expect(fixture.nativeElement.querySelectorAll('.star.filled').length).toBe(3);
  });

  it('should show the avatar and the name of each customer', () => {
    const fixture = TestBed.createComponent(ReviewsCarousel);
    fixture.componentInstance.reviews = [
      { author: 'Ines Ben Salah', city: 'La Marsa', rating: 5, text: 'Test', car: 'BMW iX', photo: 'ines-ben-salah.svg' },
    ];
    fixture.detectChanges();
    const image = fixture.nativeElement.querySelector('.avatar') as HTMLImageElement;
    expect(image.getAttribute('src')).toBe('avatars/ines-ben-salah.svg');
    expect(image.alt).toContain('Ines Ben Salah');
  });

  it('should show the demo notice only when the reviews are fictional', () => {
    const fixture = TestBed.createComponent(ReviewsCarousel);
    fixture.componentInstance.reviews = [
      { author: 'A B', city: 'Tunis', rating: 5, text: 'Test', car: 'Audi Q5', photo: 'a.svg' },
    ];
    fixture.componentInstance.isDemo = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.demo-notice')).toBeTruthy();

    const other = TestBed.createComponent(ReviewsCarousel);
    other.componentInstance.reviews = fixture.componentInstance.reviews;
    other.componentInstance.isDemo = false;
    other.detectChanges();
    expect(other.nativeElement.querySelector('.demo-notice')).toBeNull();
  });

  it('should hide an avatar that cannot be loaded', () => {
    const image = document.createElement('img');
    component.hideBrokenAvatar({ target: image } as unknown as Event);
    expect(image.style.display).toBe('none');
  });
});
