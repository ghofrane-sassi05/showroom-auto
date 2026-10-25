import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Auto } from '../../interfaces/auto';
import { ContactService } from '../../services/contact.service';
import { autoAltText } from '../../utils/auto-text';
import { PhotoGallery } from '../photo-gallery/photo-gallery';
import { TestDriveForm } from '../test-drive-form/test-drive-form';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faLink, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  imports: [PhotoGallery, TestDriveForm, FontAwesomeModule],
  selector: 'app-car-details',
  styleUrl: './car-details.css',
  templateUrl: './car-details.html',
})
export class CarDetails {
  // Les icônes utilisées dans le modèle HTML
  faXmark = faXmark;
  faLink = faLink;
  faCircleCheck = faCircleCheck;
  faWhatsapp = faWhatsapp;

  @Input() auto: Auto | null = null;

  // Les 3 voitures similaires (calculées par le parent)
  @Input() similarAutos: Auto[] = [];

  // Coordonnées de l'enseigne (données par le parent)
  @Input() shopEmail: string = '';
  @Input() shopPhone: string = '';

  // Quand on ferme la fenêtre, on prévient le parent
  @Output() closed = new EventEmitter<void>();

  // Quand on clique sur une voiture similaire, on prévient le parent
  @Output() similarSelected = new EventEmitter<Auto>();

  // État de la fenêtre
  activeTab: 'interest' | 'drive' = 'interest';
  errorMessage = '';
  messageSent = false;
  linkCopied = false;

  constructor(
    private contactService: ContactService,
    private changeDetector: ChangeDetectorRef
  ) {}

  altText(auto: Auto): string {
    return autoAltText(auto);
  }

  // Remet la fenêtre dans son état de départ
  resetState() {
    this.activeTab = 'interest';
    this.errorMessage = '';
    this.messageSent = false;
    this.linkCopied = false;
  }

  close() {
    this.resetState();
    this.closed.emit();
  }

  openSimilar(auto: Auto) {
    this.resetState();
    this.similarSelected.emit(auto);
  }

  // ----- WhatsApp -----

  // Écrire à l'enseigne, avec un message déjà prêt
  get whatsappLink(): string {
    if (!this.auto) {
      return '';
    }
    const message = `Bonjour, je suis intéressé par la ${this.auto.brand} ${this.auto.model} à ${this.auto.price} DNT.`;
    return this.contactService.whatsappLink(this.shopPhone, message);
  }

  // ----- Partage -----

  // Lien direct vers cette voiture, par exemple https://monsite.tn/?voiture=3
  get shareLink(): string {
    if (!this.auto) {
      return '';
    }
    return `${window.location.origin}${window.location.pathname}?voiture=${this.auto.id}`;
  }

  // Partager la voiture à quelqu'un d'autre sur WhatsApp (sans numéro : on choisit le contact)
  get whatsappShareLink(): string {
    if (!this.auto) {
      return '';
    }
    const message = `Regarde cette voiture : ${this.auto.brand} ${this.auto.model} (${this.auto.price} DNT)\n${this.shareLink}`;
    return this.contactService.whatsappLink('', message);
  }

  copyLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.shareLink)
        .then(() => this.showCopiedMessage())
        .catch(() => window.prompt('Copiez ce lien :', this.shareLink));
    } else {
      window.prompt('Copiez ce lien :', this.shareLink);
    }
  }

  // Affiche "Lien copié" pendant 2 secondes.
  // Ce projet n'utilise pas zone.js : après une action asynchrone,
  // il faut dire à Angular de remettre l'écran à jour avec markForCheck().
  showCopiedMessage() {
    this.linkCopied = true;
    this.changeDetector.markForCheck();
    setTimeout(() => {
      this.linkCopied = false;
      this.changeDetector.markForCheck();
    }, 2000);
  }

  // ----- Formulaire "Je suis intéressé" -----

  sendInterest(name: string, phone: string, message: string) {
    if (!this.auto) {
      return;
    }
    // 1. On vérifie que le nom et le téléphone sont remplis
    if (name.trim() === '' || phone.trim() === '') {
      this.errorMessage = 'Veuillez remplir votre nom et votre téléphone.';
      return;
    }
    this.errorMessage = '';

    // 2. On ouvre l'application e-mail avec un message déjà écrit
    const subject = `Intéressé par ${this.auto.brand} ${this.auto.model}`;
    const body =
      `Nom : ${name}\nTéléphone : ${phone}\n` +
      `Voiture : ${this.auto.brand} ${this.auto.model} (${this.auto.price} DNT)\n\n${message}`;
    this.contactService.openEmail(this.shopEmail, subject, body);

    this.messageSent = true;
  }
}
