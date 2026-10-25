import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowUpRightFromSquare, faCarSide, faChevronLeft, faChevronRight, faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import { NewsItem } from '../../interfaces/news-item';
import { Reveal } from '../../directives/reveal';

@Component({
  imports: [Reveal, FontAwesomeModule],
  selector: 'app-news-section',
  styleUrl: './news-section.css',
  templateUrl: './news-section.html',
})
export class NewsSection {
  // Les actualités à afficher et la date de la dernière mise à jour
  @Input() news: NewsItem[] = [];
  @Input() updatedOn: string = '';

  // Les marques vendues par le showroom (pour proposer "Voir nos ...")
  @Input() brands: string[] = [];

  // Quand on clique sur "Voir nos ...", on envoie la marque au parent
  @Output() brandSelected = new EventEmitter<string>();

  // Les icônes utilisées dans le modèle HTML
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faNewspaper = faNewspaper;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;
  faCarSide = faCarSide;

  // Les onglets de filtre ("" = tout afficher)
  categories = [
    { label: 'Tout', value: '' },
    { label: 'Nouveautés', value: 'Nouveauté' },
    { label: 'Actualités', value: 'Actualité' },
  ];
  selectedCategory = '';

  // Les actualités visibles selon l'onglet choisi
  get visibleNews(): NewsItem[] {
    if (this.selectedCategory === '') {
      return this.news;
    }
    return this.news.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(value: string) {
    this.selectedCategory = value;
  }

  // Transforme "Land Rover" en "logos/land-rover.webp"
  logoPath(brand: string): string {
    return 'logos/' + brand.toLowerCase().replace(' ', '-') + '.webp';
  }

  // Vrai si le showroom vend cette marque
  isShowroomBrand(brand: string): boolean {
    return brand !== '' && this.brands.includes(brand);
  }

  // Si le logo d'une marque n'existe pas dans public/logos, on cache l'image cassée
  hideBrokenLogo(event: Event) {
    (event.target as HTMLElement).style.display = 'none';
  }

  onSeeBrand(brand: string) {
    this.brandSelected.emit(brand);
  }
}
