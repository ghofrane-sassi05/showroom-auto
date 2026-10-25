import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-photo-gallery',
  styleUrl: './photo-gallery.css',
  templateUrl: './photo-gallery.html',
})
export class PhotoGallery {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  // Les noms des photos à afficher (donnés par le parent)
  @Input() photos: string[] = [];
  // Description de la voiture, utilisée pour le texte alternatif des images
  @Input() altText: string = '';

  // Numéro de la photo affichée (0 = la première)
  currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
  }

  show(index: number) {
    this.currentIndex = index;
  }
}
