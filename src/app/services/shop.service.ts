import { Injectable } from '@angular/core';
import { OpeningDay } from '../interfaces/opening-day';
import { Review } from '../interfaces/review';

// Les informations de l'enseigne : horaires et avis clients
@Injectable({ providedIn: 'root' })
export class ShopService {
  // ⚠️ Horaires d'exemple : à remplacer par les vrais horaires.
  // L'ordre suit la fonction JavaScript getDay() : 0 = dimanche, 1 = lundi, ...
  private openingHours: OpeningDay[] = [
    { day: 'Dimanche', open: '', close: '' },
    { day: 'Lundi', open: '09:00', close: '18:00' },
    { day: 'Mardi', open: '09:00', close: '18:00' },
    { day: 'Mercredi', open: '09:00', close: '18:00' },
    { day: 'Jeudi', open: '09:00', close: '18:00' },
    { day: 'Vendredi', open: '09:00', close: '18:00' },
    { day: 'Samedi', open: '09:00', close: '13:00' },
  ];

  // ⚠️ AVIS FICTIFS, présentés à titre de démonstration : les noms, les villes et les
  // images (avatars illustrés dans public/avatars) sont inventés.
  // Quand vous aurez de vrais avis, remplacez-les (avec l'accord de vos clients pour
  // leur nom et leur photo), puis mettez reviewsAreDemo à false pour retirer la mention.
  private reviewsAreDemo = true;

  private reviews: Review[] = [
    { author: 'Mohamed Amine Trabelsi', city: 'Tunis', rating: 5, car: 'Audi Q5',
      photo: 'mohamed-amine-trabelsi.svg',
      text: "Accueil agréable et voiture conforme à la description. Les papiers ont été réglés rapidement." },
    { author: 'Ines Ben Salah', city: 'La Marsa', rating: 5, car: 'BMW iX',
      photo: 'ines-ben-salah.svg',
      text: "Très bon suivi du début à la fin. L'équipe a pris le temps de répondre à toutes mes questions." },
    { author: 'Youssef Gharbi', city: 'Ariana', rating: 4, car: 'Mercedes GLA',
      photo: 'youssef-gharbi.svg',
      text: "Un bon choix de voitures et des conseils utiles. L'essai routier m'a aidé à me décider." },
    { author: 'Sarra Mejri', city: 'Sousse', rating: 5, car: 'Range Rover Evoque',
      photo: 'sarra-mejri.svg',
      text: "Processus simple et équipe disponible. La reprise de mon ancienne voiture s'est faite sans stress." },
  ];

  // Les horaires dans l'ordre d'affichage : du lundi au dimanche
  getOpeningHoursFromMonday(): OpeningDay[] {
    return [1, 2, 3, 4, 5, 6, 0].map(index => this.openingHours[index]);
  }

  // Les horaires d'un jour (0 = dimanche, ..., 6 = samedi)
  getDayHours(dayIndex: number): OpeningDay {
    return this.openingHours[dayIndex];
  }

  getReviews(): Review[] {
    return this.reviews;
  }

  // Vrai tant que les avis affichés sont des exemples fictifs
  areReviewsDemo(): boolean {
    return this.reviewsAreDemo;
  }

  // L'heure actuelle à Tunis (même si le visiteur est dans un autre pays)
  getTunisNow(): Date {
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Tunis' }));
  }

  // Transforme '09:30' en nombre de minutes depuis minuit (570)
  toMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Dit si le showroom est ouvert et écrit une phrase pour le visiteur
  getStatus(now: Date = this.getTunisNow()): { isOpen: boolean; text: string } {
    const today = this.openingHours[now.getDay()];
    const minutesNow = now.getHours() * 60 + now.getMinutes();

    if (today.open !== '') {
      if (minutesNow >= this.toMinutes(today.open) && minutesNow < this.toMinutes(today.close)) {
        return { isOpen: true, text: `Ouvert maintenant · ferme à ${today.close}` };
      }
      if (minutesNow < this.toMinutes(today.open)) {
        return { isOpen: false, text: `Fermé · ouvre aujourd'hui à ${today.open}` };
      }
    }

    // Sinon on cherche le prochain jour d'ouverture
    for (let i = 1; i <= 7; i++) {
      const next = this.openingHours[(now.getDay() + i) % 7];
      if (next.open !== '') {
        const when = i === 1 ? 'demain' : next.day.toLowerCase();
        return { isOpen: false, text: `Fermé · ouvre ${when} à ${next.open}` };
      }
    }
    return { isOpen: false, text: 'Fermé' };
  }
}
