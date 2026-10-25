export interface Auto {
  id: number;
  brand: string;
  model: string;
  power: number;
  price: number;
  // Image principale (utilisée sur les cartes)
  photo: string;
  // Toutes les images de la galerie (la première = l'image principale)
  photos: string[];
  availability: number;
  description: string;
  // "neuf" ou "occasion"
  condition: 'neuf' | 'occasion';
  // Kilométrage : seulement pour les voitures d'occasion
  mileage?: number;
  year: number;
  fuel: string; // Essence, Diesel, Hybride, Électrique
  transmission: string; // Manuelle, Automatique
  color: string;
}
