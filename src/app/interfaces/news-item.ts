export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  // "Nouveauté" (nouveau modèle) ou "Actualité" (information du monde auto)
  category: 'Nouveauté' | 'Actualité';
  // Nom de la marque, exactement comme dans les voitures du showroom
  // (ex : "Mercedes Benz"). Laisser "" si l'actualité concerne tout le monde de l'auto.
  brand: string;
  // Date affichée, écrite à la main (ex : "Octobre 2026")
  dateLabel: string;
  // Le site d'où vient l'information, et le lien vers l'article complet
  sourceName: string;
  url: string;
}
