// Les horaires d'un jour. Si le showroom est fermé : open = '' et close = ''
export interface OpeningDay {
  day: string;
  open: string; // ex : '09:00'
  close: string; // ex : '18:00'
}
