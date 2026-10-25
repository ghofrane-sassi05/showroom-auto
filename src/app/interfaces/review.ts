export interface Review {
  author: string;
  city: string;
  rating: number; // de 1 à 5
  text: string;
  car: string; // la voiture achetée
  photo: string; // nom du fichier dans public/avatars (ex : 'ines-ben-salah.svg')
}
