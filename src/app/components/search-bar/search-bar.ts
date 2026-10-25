import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  faMagnifyingGlass = faMagnifyingGlass;

  // Le texte affiché dans le champ (donné par le parent)
  @Input() text: string = '';

  // À chaque lettre tapée, on envoie le texte au parent (App)
  @Output() OnSearch = new EventEmitter<string>();

  search(text: string) {
    this.OnSearch.emit(text);
  }
}
