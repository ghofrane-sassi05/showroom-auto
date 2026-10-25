import { Component, Input } from '@angular/core';
import { Review } from '../../interfaces/review';
import { Reveal } from '../../directives/reveal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [Reveal, FontAwesomeModule],
  selector: 'app-reviews-carousel',
  styleUrl: './reviews-carousel.css',
  templateUrl: './reviews-carousel.html',
})
export class ReviewsCarousel {
  @Input() reviews: Review[] = [];
  // Vrai quand les avis sont des exemples fictifs : une mention est alors affichée
  @Input() isDemo: boolean = false;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faStar = faStar;

  // Les 5 positions d'étoiles affichées pour chaque avis
  starPositions = [1, 2, 3, 4, 5];

  // Si une image d'avatar est introuvable, on la cache
  hideBrokenAvatar(event: Event) {
    (event.target as HTMLElement).style.display = 'none';
  }

  // Une étoile est dorée si sa position est inférieure ou égale à la note
  // (note 4 : étoiles 1, 2, 3 et 4 dorées, étoile 5 grise)
  isStarFilled(position: number, rating: number): boolean {
    return position <= rating;
  }
}
