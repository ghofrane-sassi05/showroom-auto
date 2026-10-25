import { Injectable } from '@angular/core';

// Petites fonctions pour contacter l'enseigne, utilisées par plusieurs formulaires
@Injectable({ providedIn: 'root' })
export class ContactService {
  // Ouvre l'application e-mail du visiteur avec un message déjà écrit
  openEmail(to: string, subject: string, body: string) {
    window.location.href =
      `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // Crée un lien WhatsApp. Sans numéro (""), WhatsApp laisse choisir le contact.
  whatsappLink(phone: string, message: string): string {
    const number = phone.replace(/\D/g, ''); // WhatsApp veut des chiffres seulement
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }
}
