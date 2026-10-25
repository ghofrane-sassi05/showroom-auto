// Les choix proposés dans la barre de filtres
// (calculés automatiquement à partir des voitures)
export interface FilterOptions {
  models: string[];
  colors: string[];
  fuels: string[];
  transmissions: string[];
  years: number[];
  minPrice: number; // limite basse du curseur de prix
  maxPrice: number; // limite haute du curseur de prix
}
