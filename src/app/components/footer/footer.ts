import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OpeningDay } from '../../interfaces/opening-day';
import { ShopService } from '../../services/shop.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  faLocationDot = faLocationDot;
  faEnvelope = faEnvelope;
  faPhone = faPhone;

  @Input() shopName: string = '';

  // Les coordonnées viennent du composant parent (App)
  @Input() email: string = '';
  @Input() phone: string = '';
  @Input() address: string = '';

  // Les horaires et l'état "Ouvert / Fermé" viennent du service
  hours: OpeningDay[] = [];
  status = { isOpen: false, text: '' };
  todayName = '';

  // Angular bloque les liens externes dans un <iframe> par sécurité.
  // Comme l'adresse est écrite par nous, on dit à Angular qu'elle est sûre.
  mapUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private shopService: ShopService) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.openstreetmap.org/export/embed.html?bbox=10.14%2C36.78%2C10.22%2C36.83&layer=mapnik&marker=36.8065%2C10.1815'
    );

    this.hours = this.shopService.getOpeningHoursFromMonday();
    const now = this.shopService.getTunisNow();
    this.status = this.shopService.getStatus(now);
    this.todayName = this.shopService.getDayHours(now.getDay()).day;
  }
}
