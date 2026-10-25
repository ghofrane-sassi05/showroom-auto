import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results-count',
  styleUrl: './results-count.css',
  templateUrl: './results-count.html',
})
export class ResultsCount {
  // Nombre de voitures trouvées (donné par le parent)
  @Input() count: number = 0;
  // Vrai quand le visiteur regarde seulement ses favoris
  @Input() showingFavorites: boolean = false;
}
