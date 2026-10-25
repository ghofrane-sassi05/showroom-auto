import { Component, Input } from '@angular/core';
import { Reveal } from '../../directives/reveal';
import { ContactService } from '../../services/contact.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [Reveal, FontAwesomeModule],
  selector: 'app-trade-in-form',
  styleUrl: './trade-in-form.css',
  templateUrl: './trade-in-form.html',
})
export class TradeInForm {
  faCircleCheck = faCircleCheck;

  @Input() shopEmail: string = '';

  conditions = ['Excellent', 'Bon', 'Moyen', 'À réparer'];
  messageSent = false;

  constructor(private contactService: ContactService) {}

  send(event: Event, form: HTMLFormElement) {
    event.preventDefault(); // empêche le rechargement de la page
    // FormData permet de lire tous les champs du formulaire d'un coup
    const data = new FormData(form);
    const body =
      `Demande d'estimation (reprise)\n\n` +
      `Véhicule : ${data.get('brand')} ${data.get('model')} (${data.get('year')})\n` +
      `Kilométrage : ${data.get('mileage')} km\n` +
      `État : ${data.get('condition')}\n\n` +
      `Nom : ${data.get('name')}\nTéléphone : ${data.get('phone')}\n\n${data.get('message')}`;

    this.contactService.openEmail(this.shopEmail, 'Demande de reprise', body);
    form.reset();
    this.messageSent = true;
  }
}
