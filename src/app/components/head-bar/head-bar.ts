import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-head-bar',
  styleUrl: './head-bar.css',
  templateUrl: './head-bar.html',
})
export class HeadBar {
  faHeart = faHeart;

  // Le nom de l'enseigne vient du composant parent (App)
  @Input() shopName: string = '';

  // Nombre de voitures favorites et état du bouton "Favoris"
  @Input() favoritesCount: number = 0;
  @Input() showingFavorites: boolean = false;

  // Quand on clique sur "Contact", on prévient le parent
  @Output() contactClicked = new EventEmitter<void>();

  // Quand on clique sur "Favoris", on prévient le parent
  @Output() favoritesClicked = new EventEmitter<void>();

  onFavoritesClick() {
    this.favoritesClicked.emit();
  }

  onContactClick() {
    this.contactClicked.emit();
  }
}
