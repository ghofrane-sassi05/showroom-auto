import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reveal } from '../../directives/reveal';

@Component({
  imports: [Reveal],
  selector: 'app-brand-list',
  styleUrl: './brand-list.css',
  templateUrl: './brand-list.html',
})
export class BrandList {
  @Input() brands: string[] = [];
  // La marque actuellement choisie ("" = toutes)
  @Input() selectedBrand: string = '';

  @Output() brandSelected = new EventEmitter<string>();

  // Transforme "Land Rover" en "logos/land-rover.webp"
  logoPath(brand: string): string {
    return 'logos/' + brand.toLowerCase().replace(' ', '-') + '.webp';
  }

  // Vrai si cette marque correspond à ce qui est choisi / tapé
  isSelected(brand: string): boolean {
    return brand.toLowerCase() === this.selectedBrand.toLowerCase();
  }

  onBrandClick(brand: string) {
    // Si on reclique sur la marque déjà choisie, on enlève le filtre
    if (this.isSelected(brand)) {
      this.brandSelected.emit('');
    } else {
      this.brandSelected.emit(brand);
    }
  }
}
