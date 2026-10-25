import { TestBed } from '@angular/core/testing';
import { ShopService } from './shop.service';

describe('ShopService', () => {
  let service: ShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopService);
  });

  // Mercredi 21 octobre 2026 à 10h30 → ouvert (09:00 - 18:00)
  it('should be open on a weekday morning', () => {
    const status = service.getStatus(new Date(2026, 9, 21, 10, 30));
    expect(status.isOpen).toBe(true);
    expect(status.text).toContain('18:00');
  });

  it('should be closed in the evening and open again tomorrow', () => {
    const status = service.getStatus(new Date(2026, 9, 21, 20, 0));
    expect(status.isOpen).toBe(false);
    expect(status.text).toContain('demain');
  });

  it('should be closed before opening time', () => {
    const status = service.getStatus(new Date(2026, 9, 21, 7, 0));
    expect(status.isOpen).toBe(false);
    expect(status.text).toContain("aujourd'hui");
  });

  // Dimanche 25 octobre 2026 → fermé, réouverture le lendemain (lundi)
  it('should be closed on Sunday and reopen tomorrow', () => {
    const status = service.getStatus(new Date(2026, 9, 25, 11, 0));
    expect(status.isOpen).toBe(false);
    expect(status.text).toContain('demain');
  });

  // Samedi 24 octobre 2026 à 15h → fermé (fermeture à 13h), le dimanche aussi : réouverture lundi
  it('should name the day when the next opening is not tomorrow', () => {
    const status = service.getStatus(new Date(2026, 9, 24, 15, 0));
    expect(status.isOpen).toBe(false);
    expect(status.text).toContain('lundi');
  });

  it('should list the days from Monday to Sunday', () => {
    const days = service.getOpeningHoursFromMonday().map(day => day.day);
    expect(days[0]).toBe('Lundi');
    expect(days[6]).toBe('Dimanche');
  });

  it('should convert times to minutes', () => {
    expect(service.toMinutes('09:30')).toBe(570);
  });

  it('should give every review a full name, a city and an avatar file', () => {
    const reviews = service.getReviews();
    expect(reviews.length).toBe(4);
    reviews.forEach(review => {
      expect(review.author.trim().split(' ').length).toBeGreaterThanOrEqual(2);
      expect(review.author).not.toContain('exemple');
      expect(review.city).not.toBe('');
      expect(review.photo.endsWith('.svg')).toBe(true);
    });
  });

  it('should use a different avatar for each review', () => {
    const photos = service.getReviews().map(review => review.photo);
    expect(new Set(photos).size).toBe(photos.length);
  });

  it('should tell that the reviews are fictional demo content', () => {
    expect(service.areReviewsDemo()).toBe(true);
  });
});
