import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Reveal } from './reveal';

@Component({ imports: [Reveal], template: '<div appReveal>Test</div>' })
class TestHost {}

describe('Reveal', () => {
  it('should add the reveal class, and show the element when it cannot observe scrolling', () => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(element.classList.contains('reveal')).toBe(true);
    // Dans les tests, IntersectionObserver n'existe pas : l'élément est affiché directement
    if (typeof IntersectionObserver === 'undefined') {
      expect(element.classList.contains('visible')).toBe(true);
    }
  });
});
