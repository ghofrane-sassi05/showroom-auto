// Les filtres et le tri choisis par le visiteur
// ("" ou 0 veut dire "pas de filtre")
export interface Filters {
  minPrice: number;
  maxPrice: number;
  model: string;
  fuel: string;
  transmission: string;
  color: string;
  minYear: number;
  sortBy: string; // "", "price-asc", "price-desc", "power-desc"
}
