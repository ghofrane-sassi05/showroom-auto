import { TestBed } from '@angular/core/testing';
import { PhotoGallery } from './photo-gallery';

describe('PhotoGallery', () => {
  let component: PhotoGallery;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PhotoGallery] }).compileComponents();
    component = TestBed.createComponent(PhotoGallery).componentInstance;
    component.photos = ['a.webp', 'b.webp', 'c.webp'];
  });

  it('should go to the next photo and loop back to the first', () => {
    component.next();
    expect(component.currentIndex).toBe(1);
    component.next();
    component.next();
    expect(component.currentIndex).toBe(0);
  });

  it('should go to the previous photo and loop to the last', () => {
    component.previous();
    expect(component.currentIndex).toBe(2);
  });

  it('should show a chosen photo', () => {
    component.show(1);
    expect(component.currentIndex).toBe(1);
  });
});
