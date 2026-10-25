import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filters } from '../../interfaces/filters';
import { FilterOptions } from '../../interfaces/filter-options';

@Component({
  selector: 'app-filter-bar',
  styleUrl: './filter-bar.css',
  templateUrl: './filter-bar.html',
})
export class FilterBar implements OnInit {
  // Les choix proposés (modèles, couleurs, limites de prix...) viennent du parent
  @Input() options: FilterOptions = {
    models: [], colors: [], fuels: [], transmissions: [], years: [],
    minPrice: 0, maxPrice: 1000,
  };

  // On envoie les filtres au parent à chaque changement
  @Output() filtersChanged = new EventEmitter<Filters>();

  // Les façons de trier
  sortOptions = [
    { label: 'Par défaut', value: '' },
    { label: 'Prix croissant', value: 'price-asc' },
    { label: 'Prix décroissant', value: 'price-desc' },
    { label: 'Puissance (la plus forte)', value: 'power-desc' },
  ];

  // Ce que le visiteur a choisi
  selectedMinPrice = 0;
  selectedMaxPrice = 1000;
  selectedModel = '';
  selectedFuel = '';
  selectedTransmission = '';
  selectedColor = '';
  selectedMinYear = 0;
  selectedSort = '';

  // ngOnInit est appelé une fois, quand les @Input sont prêts
  ngOnInit() {
    this.selectedMinPrice = this.options.minPrice;
    this.selectedMaxPrice = this.options.maxPrice;
  }

  // Curseur du prix minimum : il ne peut pas dépasser le prix maximum
  onMinPriceChange(value: string) {
    this.selectedMinPrice = Number(value);
    if (this.selectedMinPrice > this.selectedMaxPrice) {
      this.selectedMaxPrice = this.selectedMinPrice;
    }
    this.sendFilters();
  }

  // Curseur du prix maximum : il ne peut pas descendre sous le prix minimum
  onMaxPriceChange(value: string) {
    this.selectedMaxPrice = Number(value);
    if (this.selectedMaxPrice < this.selectedMinPrice) {
      this.selectedMinPrice = this.selectedMaxPrice;
    }
    this.sendFilters();
  }

  onModelChange(value: string) {
    this.selectedModel = value;
    this.sendFilters();
  }

  onFuelChange(value: string) {
    this.selectedFuel = value;
    this.sendFilters();
  }

  onTransmissionChange(value: string) {
    this.selectedTransmission = value;
    this.sendFilters();
  }

  onColorChange(value: string) {
    this.selectedColor = value;
    this.sendFilters();
  }

  onYearChange(value: string) {
    this.selectedMinYear = Number(value); // "" devient 0 = toutes les années
    this.sendFilters();
  }

  onSortChange(value: string) {
    this.selectedSort = value;
    this.sendFilters();
  }

  reset() {
    this.selectedMinPrice = this.options.minPrice;
    this.selectedMaxPrice = this.options.maxPrice;
    this.selectedModel = '';
    this.selectedFuel = '';
    this.selectedTransmission = '';
    this.selectedColor = '';
    this.selectedMinYear = 0;
    this.selectedSort = '';
    this.sendFilters();
  }

  sendFilters() {
    this.filtersChanged.emit({
      minPrice: this.selectedMinPrice,
      maxPrice: this.selectedMaxPrice,
      model: this.selectedModel,
      fuel: this.selectedFuel,
      transmission: this.selectedTransmission,
      color: this.selectedColor,
      minYear: this.selectedMinYear,
      sortBy: this.selectedSort,
    });
  }
}
