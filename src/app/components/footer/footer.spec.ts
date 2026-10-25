import { TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  it('should list the 7 days of opening hours and an open/closed status', async () => {
    await TestBed.configureTestingModule({ imports: [Footer] }).compileComponents();
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.hours li').length).toBe(7);
    expect(fixture.componentInstance.status.text).toMatch(/Ouvert|Fermé/);
  });
});
