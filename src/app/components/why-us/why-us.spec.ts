import { TestBed } from '@angular/core/testing';
import { WhyUs } from './why-us';

describe('WhyUs', () => {
  it('should show the reasons', async () => {
    await TestBed.configureTestingModule({ imports: [WhyUs] }).compileComponents();
    const fixture = TestBed.createComponent(WhyUs);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('article').length).toBe(4);
  });
});
