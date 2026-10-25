import { Auto } from '../interfaces/auto';

// Texte alternatif complet d'une photo (utile pour l'accessibilité et le référencement Google)
export function autoAltText(auto: Auto): string {
  const type = auto.condition === 'neuf' ? 'voiture neuve' : "voiture d'occasion";
  return `${auto.brand} ${auto.model} ${auto.year}, ${auto.color}, ${auto.fuel}, ${type}`;
}
