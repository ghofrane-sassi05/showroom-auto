import { Component } from '@angular/core';
import { Reveal } from '../../directives/reveal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowsRotate, faClipboardCheck, faCreditCard, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [Reveal, FontAwesomeModule],
  selector: 'app-why-us',
  styleUrl: './why-us.css',
  templateUrl: './why-us.html',
})
export class WhyUs {
  // ⚠️ Adaptez ces textes à ce que le showroom propose réellement
  reasons: { icon: IconDefinition; title: string; text: string }[] = [
    { icon: faShieldHalved, title: 'Garantie', text: 'Une garantie adaptée à chaque véhicule, pour rouler l’esprit tranquille.' },
    { icon: faArrowsRotate, title: 'Reprise', text: 'Nous reprenons votre ancien véhicule : demandez votre estimation en ligne.' },
    { icon: faCreditCard, title: 'Financement', text: 'Des solutions de financement pour étaler le paiement de votre voiture.' },
    { icon: faClipboardCheck, title: 'Véhicules contrôlés', text: 'Chaque voiture est vérifiée avant d’être proposée à la vente.' },
  ];
}
