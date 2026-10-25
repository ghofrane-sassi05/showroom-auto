import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

// Une directive ajoute un comportement à un élément HTML.
// Ici : l'élément est caché au départ, puis apparaît en douceur
// quand le visiteur le fait entrer dans l'écran en défilant.
// Utilisation : <article appReveal> ... </article>
@Directive({
  selector: '[appReveal]',
})
export class Reveal implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private element: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const el = this.element.nativeElement;
    el.classList.add('reveal');

    // Si le navigateur ne sait pas surveiller le défilement, on affiche directement
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('visible');
      return;
    }

    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        el.classList.add('visible');
        this.observer?.disconnect(); // une seule apparition suffit
      }
    }, { threshold: 0.1 });
    this.observer.observe(el);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
