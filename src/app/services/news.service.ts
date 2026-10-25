import { Injectable } from '@angular/core';
import { NewsItem } from '../interfaces/news-item';

// Les actualités et nouveautés du monde automobile.
// Pour ajouter une actualité : copiez un bloc { ... } ci-dessous, changez le texte,
// puis mettez à jour "lastUpdate". Les textes sont des résumés : le lien
// "Lire la suite" renvoie vers l'article complet du site d'origine.
@Injectable({ providedIn: 'root' })
export class NewsService {
  // Date de la dernière mise à jour, affichée sous le titre de la section
  private lastUpdate = 'Octobre 2026';

  private newsList: NewsItem[] = [
    {
      id: 1,
      category: 'Actualité',
      brand: '',
      dateLabel: 'Octobre 2026',
      title: "Mondial de l'Auto 2026 : un salon qui retrouve ses constructeurs",
      summary:
        "La 91e édition se tient à Paris du 12 au 18 octobre 2026, avec plus de 60 constructeurs, de nombreuses avant-premières et l'arrivée de marques chinoises. BMW et Jaguar Land Rover font partie des absents.",
      sourceName: 'Caroom',
      url: 'https://www.caroom.fr/blog/mondial-de-lauto-de-paris-2026-quelles-sont-les-nouveautes-automobiles-les-plus-attendues-de-cette-edition-42402.html',
    },
    {
      id: 10,
      category: 'Nouveauté',
      brand: 'Tesla',
      dateLabel: '2026',
      title: "Tesla Model Y restylé : plus de confort, un peu moins d’autonomie",
      summary:
        "Le Model Y reçoit une mise à jour de mi-carrière (nom de code Juniper) : carrosserie redessinée, meilleure qualité de fabrication, suspension recalibrée et isolation sonore renforcée. La version Performance passe de 0 à 100 km/h en 3,5 secondes, mais son autonomie maximale baisse de 526 à 492 km.",
      sourceName: 'Guide Auto',
      url: 'https://www.guideautoweb.com/en/makes/tesla/model-y/2026/ratings',
    },
    {
      id: 11,
      category: 'Actualité',
      brand: 'Tesla',
      dateLabel: '2026',
      title: "Cybercab : le robotaxi de Tesla est entré en production",
      summary:
        "Selon Elon Musk, la production du Cybercab, le robotaxi conçu sans volant ni pédales, a démarré. Pour l’instant, le réseau de robotaxis de Tesla utilise encore des Model Y modifiées.",
      sourceName: 'Not a Tesla App',
      url: 'https://www.notateslaapp.com/news/3532/elon-musk-doubles-down-on-fsd-approvals-for-europe-and-china',
    },
    {
      id: 2,
      category: 'Actualité',
      brand: 'Mercedes Benz',
      dateLabel: 'Octobre 2026',
      title: 'Mercedes-Benz fait son retour au Mondial de l’Auto',
      summary:
        "Absent depuis 2018, le constructeur présente à Paris le renouvellement de sa gamme : GLA, GLB, GLC, CLA, le monospace électrique VLE et l'AMG GT Coupé 4 Portes électrique. 2026 marque aussi les 140 ans du brevet de Carl Benz.",
      sourceName: 'Mondial.paris',
      url: 'https://mondial.paris/actualites/auto-mondial/mercedes-benz-au-mondial-de-l-auto-2026-un-programme-riche-90572.html',
    },
    {
      id: 3,
      category: 'Nouveauté',
      brand: 'Mercedes Benz',
      dateLabel: 'Octobre 2026',
      title: 'Nouveau GLA électrique : jusqu’à 657 km d’autonomie',
      summary:
        "Le SUV premium de Mercedes passe à l'électrique. Le constructeur annonce jusqu'à 657 km d'autonomie et une recharge rapide pouvant atteindre 320 kW.",
      sourceName: 'Automobile Propre',
      url: 'https://www.automobile-propre.com/articles/mondial-de-lauto-2026-decouvrez-la-liste-de-toutes-les-nouveautes-et-concepts-a-decouvrir-au-salon-de-paris/',
    },
    {
      id: 4,
      category: 'Nouveauté',
      brand: 'Audi',
      dateLabel: 'Octobre 2026',
      title: 'Audi A2 e-tron : la nouvelle compacte électrique',
      summary:
        "Future entrée de gamme électrique d'Audi, l'A2 e-tron est annoncée avec un prix de départ sous les 40 000 €. Sa production doit démarrer à Ingolstadt à l'automne 2026.",
      sourceName: 'Automobile Propre',
      url: 'https://www.automobile-propre.com/articles/mondial-de-lauto-2026-decouvrez-la-liste-de-toutes-les-nouveautes-et-concepts-a-decouvrir-au-salon-de-paris/',
    },
    {
      id: 5,
      category: 'Nouveauté',
      brand: 'BMW',
      dateLabel: '2026',
      title: 'BMW iX3 : le premier SUV de la nouvelle plateforme Neue Klasse',
      summary:
        "Conçu uniquement pour l'électrique, l'iX3 inaugure une architecture 800 volts. BMW annonce jusqu'à 800 km d'autonomie et une recharge jusqu'à 400 kW, de quoi récupérer environ 370 km en 10 minutes.",
      sourceName: 'Caroom',
      url: 'https://www.caroom.fr/blog/bmw-ix3-premier-suv-sur-la-plateforme-neue-klasse-apercu-de-lelectrique-nouvelle-generation-36435.html',
    },
    {
      id: 6,
      category: 'Nouveauté',
      brand: 'BMW',
      dateLabel: '2026',
      title: 'BMW i3 : la Série 3 passe à l’électrique',
      summary:
        "Après l'iX3, la plateforme Neue Klasse arrive sur la berline. La nouvelle i3, version 100 % électrique de la Série 3, serait annoncée avec plus de 800 km d'autonomie selon la presse spécialisée.",
      sourceName: 'Motor1',
      url: 'https://fr.motor1.com/news/776896/bmw-2026-toutes-les-nouveaut%C3%A9s/',
    },
    {
      id: 7,
      category: 'Nouveauté',
      brand: 'Jaguar',
      dateLabel: '2026',
      title: 'Jaguar Type 01 : la GT électrique qui relance la marque',
      summary:
        "Jaguar a dévoilé le nom de série de sa GT quatre portes : Type 01. Le « 0 » évoque le zéro émission et le « 1 » la première voiture d'un nouveau chapitre. La version de série doit être présentée d'ici la fin de 2026.",
      sourceName: 'Motor1',
      url: 'https://fr.motor1.com/news/795831/nouvelle-jaguar-type-01-s%C3%A9rie/',
    },
    {
      id: 8,
      category: 'Actualité',
      brand: 'Land Rover',
      dateLabel: '2026',
      title: 'Land Rover Defender : la nouvelle génération repoussée vers 2030',
      summary:
        "Selon la presse, le remplacement des Defender 90, 110 et 130 serait décalé d'au moins deux ans, pour les versions thermiques comme électriques. Jaguar Land Rover n'a pas communiqué de nouveau calendrier officiel.",
      sourceName: 'Caroom',
      url: 'https://www.caroom.fr/blog/land-rover-defender-la-future-version-electrique-serait-finalement-reportee-jusquen-2030-42386.html',
    },
    {
      id: 9,
      category: 'Nouveauté',
      brand: 'Alfa Romeo',
      dateLabel: 'Octobre 2026',
      title: 'Alfa Romeo Tonale restylé : un hybride de 175 ch',
      summary:
        "Le Tonale reçoit pour 2026 un style légèrement retouché et une motorisation hybride portée à 175 ch. Alfa Romeo est présent au Mondial de l'Auto, avec le Junior, désormais son modèle le plus vendu.",
      sourceName: 'Fiches-auto.fr',
      url: 'https://www.fiches-auto.fr/articles-auto/mondial-paris-2026/s-4228-mondial-de-l-auto-2026-marques-presentes.php',
    },
    {
      id: 12,
      category: 'Actualité',
      brand: 'Tesla',
      dateLabel: '2026',
      title: "Giga Berlin : la production du Model Y augmente de 20 %",
      summary:
        "L’usine allemande de Tesla a fabriqué plus de 61 000 Model Y au premier trimestre 2026. Face à une demande européenne qui repart, le constructeur a annoncé une hausse de 20 % de la production à partir de juillet 2026, avec environ 1 000 embauches.",
      sourceName: 'Not a Tesla App',
      url: 'https://www.notateslaapp.com/news/3532/elon-musk-doubles-down-on-fsd-approvals-for-europe-and-china',
    },
    {
      id: 13,
      category: 'Nouveauté',
      brand: 'Tesla',
      dateLabel: '2026',
      title: "Tesla Model Y L : une version plus longue attendue en Europe",
      summary:
        "Le Model Y L, déclinaison à empattement allongé du SUV, serait en cours d’homologation en Europe et pourrait être produit à Giga Berlin. Elle est présentée comme une option familiale avec une configuration à six places.",
      sourceName: 'Not a Tesla App',
      url: 'https://www.notateslaapp.com/news/3461/teslas-roadmap-for-2026',
    },
    {
      id: 14,
      category: 'Actualité',
      brand: 'Tesla',
      dateLabel: 'Septembre 2026',
      title: "FSD en Europe : l’autorisation se fait toujours attendre",
      summary:
        "Tesla travaillerait sur une version de sa conduite assistée FSD adaptée à la réglementation européenne, présentée aux autorités, notamment aux Pays-Bas. Début septembre 2026, aucune date de lancement officielle n’était confirmée : les informations restaient des rumeurs.",
      sourceName: 'BlogTesla (non affilié à Tesla)',
      url: 'https://www.blogtesla.fr/?p=6560',
    },
  ];

  getNews(): NewsItem[] {
    return this.newsList;
  }

  getLastUpdate(): string {
    return this.lastUpdate;
  }
}
