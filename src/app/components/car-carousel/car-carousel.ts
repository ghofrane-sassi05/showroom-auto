import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Auto } from '../../interfaces/auto';
import { Reveal } from '../../directives/reveal';
import { autoAltText } from '../../utils/auto-text';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [Reveal, FontAwesomeModule],
  selector: 'app-car-carousel',
  styleUrl: './car-carousel.css',
  templateUrl: './car-carousel.html',
})
export class CarCarousel {
  // Les icônes utilisées dans le modèle HTML
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faHeart = faHeart;

  @Input() title: string = '';
  @Input() autos: Auto[] = [];

  // Les identifiants des voitures favorites (donnés par le parent)
  @Input() favoriteIds: number[] = [];

  // Quand on clique sur "Voir plus", on envoie la voiture au parent
  @Output() carSelected = new EventEmitter<Auto>();

  // Quand on clique sur le cœur, on envoie la voiture au parent
  @Output() favoriteToggled = new EventEmitter<Auto>();

  // Texte alternatif complet de la photo
  altText(auto: Auto): string {
    return autoAltText(auto);
  }

  isFavorite(auto: Auto): boolean {
    return this.favoriteIds.includes(auto.id);
  }

  onHeartClick(auto: Auto) {
    this.favoriteToggled.emit(auto);
  }

  onSeeMore(auto: Auto) {
    this.carSelected.emit(auto);
  }
}
