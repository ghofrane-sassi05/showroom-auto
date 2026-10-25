import { Component, Input } from '@angular/core';
import { Auto } from '../../interfaces/auto';
import { ContactService } from '../../services/contact.service';
import { ShopService } from '../../services/shop.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-test-drive-form',
  styleUrl: './test-drive-form.css',
  templateUrl: './test-drive-form.html',
})
export class TestDriveForm {
  faCircleCheck = faCircleCheck;

  @Input() auto: Auto | null = null;
  @Input() shopEmail: string = '';

  // Premier jour réservable : demain (en texte AAAA-MM-JJ, comme le veut le champ date)
  minDate = this.getTomorrow();

  // Heures disponibles pour le jour choisi
  availableSlots: string[] = [];
  dayMessage = '';
  messageSent = false;

  constructor(private contactService: ContactService, private shopService: ShopService) {}

  getTomorrow(): string {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }

  // Quand le visiteur choisit une date, on calcule les heures possibles
  onDateChange(dateText: string) {
    this.availableSlots = [];
    this.dayMessage = '';
    if (dateText === '') {
      return;
    }

    // "T12:00:00" évite les décalages d'heure qui changeraient le jour
    const dayIndex = new Date(dateText + 'T12:00:00').getDay();
    const hours = this.shopService.getDayHours(dayIndex);

    if (hours.open === '') {
      this.dayMessage = `Le showroom est fermé le ${hours.day.toLowerCase()}. Choisissez une autre date.`;
      return;
    }

    // Un créneau par heure, de l'ouverture jusqu'à une heure avant la fermeture
    const first = this.shopService.toMinutes(hours.open);
    const last = this.shopService.toMinutes(hours.close) - 60;
    for (let minutes = first; minutes <= last; minutes += 60) {
      const hour = String(Math.floor(minutes / 60)).padStart(2, '0');
      const minute = String(minutes % 60).padStart(2, '0');
      this.availableSlots.push(`${hour}:${minute}`);
    }
  }

  // Quand le visiteur envoie le formulaire
  send(event: Event, form: HTMLFormElement) {
    event.preventDefault(); // empêche le rechargement de la page
    if (!this.auto) {
      return;
    }
    // FormData permet de lire tous les champs du formulaire d'un coup
    const data = new FormData(form);
    const body =
      `Demande d'essai routier\n\n` +
      `Voiture : ${this.auto.brand} ${this.auto.model} (${this.auto.year})\n` +
      `Date souhaitée : ${data.get('date')} à ${data.get('time')}\n` +
      `Nom : ${data.get('name')}\nTéléphone : ${data.get('phone')}\n\n${data.get('message')}`;

    this.contactService.openEmail(
      this.shopEmail, `Essai routier - ${this.auto.brand} ${this.auto.model}`, body);
    this.messageSent = true;
  }
}
