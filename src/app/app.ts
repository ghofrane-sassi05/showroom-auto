import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HeadBar } from './components/head-bar/head-bar';
import { SearchBar } from './components/search-bar/search-bar';
import { FilterBar } from './components/filter-bar/filter-bar';
import { ResultsCount } from './components/results-count/results-count';
import { CarCarousel } from './components/car-carousel/car-carousel';
import { NewsSection } from './components/news-section/news-section';
import { WhyUs } from './components/why-us/why-us';
import { TradeInForm } from './components/trade-in-form/trade-in-form';
import { ReviewsCarousel } from './components/reviews-carousel/reviews-carousel';
import { BrandList } from './components/brand-list/brand-list';
import { CarDetails } from './components/car-details/car-details';
import { Footer } from './components/footer/footer';
import { Auto } from './interfaces/auto';
import { Filters } from './interfaces/filters';
import { FilterOptions } from './interfaces/filter-options';
import { NewsItem } from './interfaces/news-item';
import { Review } from './interfaces/review';
import { AutoService } from './services/auto.service';
import { NewsService } from './services/news.service';
import { ShopService } from './services/shop.service';

@Component({
  imports: [
    HeadBar, SearchBar, FilterBar, ResultsCount, CarCarousel, NewsSection, WhyUs,
    TradeInForm, ReviewsCarousel, BrandList, CarDetails, Footer,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // ⚠️ Informations de l'enseigne : modifiez-les ici, elles changent partout
  shopName = 'Showroom Auto';
  shopEmail = 'contact@showroom-auto.tn';
  shopPhone = '+216 71 000 000';
  shopAddress = 'Avenue Habib Bourguiba, Tunis';

  // Titre et description de la page (pour Google et le navigateur)
  defaultTitle = `${this.shopName} - Voitures neuves et d'occasion à Tunis`;
  defaultDescription =
    "Découvrez nos voitures neuves et d'occasion. Essai routier, reprise et financement.";

  // Toutes les voitures (données venant du service)
  autoList: Auto[] = [];

  // La voiture dont on affiche les détails (null = aucune) et ses voitures similaires
  selectedCar: Auto | null = null;
  similarAutos: Auto[] = [];

  // Les choix du visiteur (remplis dans le constructor avec les limites de prix)
  filters: Filters;

  // Texte de recherche sur la marque (tapé dans la barre de recherche
  // ou rempli en cliquant sur un logo)
  selectedBrand = '';

  // Favoris : on garde seulement les identifiants (id) des voitures aimées
  favoriteIds: number[] = [];
  showOnlyFavorites = false;

  // Voitures récemment consultées : les identifiants des dernières fiches ouvertes
  recentIds: number[] = [];
  recentAutos: Auto[] = [];

  // Les listes affichées à l'écran
  newAutos: Auto[] = [];
  usedAutos: Auto[] = [];
  totalCount = 0;

  // Les données pour les filtres, la liste des marques et les avis
  filterOptions: FilterOptions;
  brands: string[] = [];
  reviews: Review[] = [];
  reviewsAreDemo = false;

  // Les actualités du monde automobile et la date de leur dernière mise à jour
  news: NewsItem[] = [];
  newsUpdatedOn = '';

  // Angular nous donne les services automatiquement grâce au constructor
  constructor(
    private autoService: AutoService,
    private shopService: ShopService,
    private newsService: NewsService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.autoList = this.autoService.getAutos();
    this.brands = this.autoService.getBrands();
    this.filterOptions = this.autoService.getFilterOptions();
    this.reviews = this.shopService.getReviews();
    this.reviewsAreDemo = this.shopService.areReviewsDemo();
    this.news = this.newsService.getNews();
    this.newsUpdatedOn = this.newsService.getLastUpdate();

    // Au départ, aucun filtre : tous les prix, tous les modèles...
    this.filters = {
      minPrice: this.filterOptions.minPrice,
      maxPrice: this.filterOptions.maxPrice,
      model: '', fuel: '', transmission: '', color: '', minYear: 0, sortBy: '',
    };

    this.loadFavorites();
    this.loadRecents();
    this.applyFilters();
    this.openCarFromUrl();
  }

  // Appelé par FilterBar quand un filtre ou le tri change
  onFiltersChanged(filters: Filters) {
    this.filters = filters;
    this.applyFilters();
  }

  // Appelé par SearchBar à chaque lettre tapée
  onSearch(text: string) {
    this.selectedBrand = text;
    this.applyFilters();
  }

  // Appelé par BrandList quand on clique sur une marque
  onBrandSelected(brand: string) {
    this.selectedBrand = brand;
    this.applyFilters();
  }

  // Appelé par NewsSection quand on clique sur "Voir nos ..." :
  // on filtre sur la marque, puis on remonte au catalogue
  onNewsBrandSelected(brand: string) {
    this.onBrandSelected(brand);
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
  }

  // Appelé par HeadBar quand on clique sur "Contact"
  goToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  // ----- Fiche détail d'une voiture -----

  // Appelé quand on clique sur "Voir plus" (ou sur une voiture similaire)
  selectCar(auto: Auto) {
    this.selectedCar = auto;
    this.similarAutos = this.autoService.getSimilarAutos(auto);
    this.addToRecents(auto);
    this.updatePageInfo(auto);
  }

  closeDetails() {
    this.selectedCar = null;
    this.similarAutos = [];
    this.updatePageInfo(null);
  }

  // Met à jour l'adresse de la page (?voiture=3), le titre et la description.
  // Ainsi le lien copié ouvre directement la bonne voiture.
  updatePageInfo(auto: Auto | null) {
    const url = window.location.pathname + (auto ? `?voiture=${auto.id}` : '');
    window.history.replaceState(null, '', url);

    if (auto) {
      this.titleService.setTitle(`${auto.brand} ${auto.model} ${auto.year} - ${this.shopName}`);
      this.metaService.updateTag({
        name: 'description',
        content: `${auto.brand} ${auto.model} ${auto.year}, ${auto.fuel}, ${auto.transmission}, ${auto.price} DNT chez ${this.shopName}.`,
      });
    } else {
      this.titleService.setTitle(this.defaultTitle);
      this.metaService.updateTag({ name: 'description', content: this.defaultDescription });
    }
  }

  // Si l'adresse contient ?voiture=3, on ouvre directement cette voiture
  openCarFromUrl() {
    const id = Number(new URLSearchParams(window.location.search).get('voiture'));
    const auto = this.autoList.find(car => car.id === id);
    if (auto) {
      this.selectCar(auto);
    }
  }

  // ----- Favoris -----

  // Appelé par CarCarousel quand on clique sur le cœur
  toggleFavorite(auto: Auto) {
    if (this.favoriteIds.includes(auto.id)) {
      // déjà favori : on l'enlève
      this.favoriteIds = this.favoriteIds.filter(id => id !== auto.id);
    } else {
      // pas encore favori : on l'ajoute
      this.favoriteIds = [...this.favoriteIds, auto.id];
    }
    this.saveFavorites();
    this.applyFilters();
  }

  // Appelé par HeadBar : afficher seulement les favoris, ou tout afficher
  toggleShowFavorites() {
    this.showOnlyFavorites = !this.showOnlyFavorites;
    this.applyFilters();
  }

  // On garde les favoris dans le navigateur pour les retrouver à la prochaine visite
  saveFavorites() {
    try {
      localStorage.setItem('favorites', JSON.stringify(this.favoriteIds));
    } catch {
      // stockage indisponible : ce n'est pas grave
    }
  }

  loadFavorites() {
    try {
      const saved = localStorage.getItem('favorites');
      this.favoriteIds = saved ? JSON.parse(saved) : [];
    } catch {
      this.favoriteIds = [];
    }
  }

  // ----- Voitures récemment consultées -----

  // Met la voiture en tête de liste (6 voitures maximum, sans doublon)
  addToRecents(auto: Auto) {
    this.recentIds = [auto.id, ...this.recentIds.filter(id => id !== auto.id)].slice(0, 6);
    this.updateRecentAutos();
    try {
      localStorage.setItem('recents', JSON.stringify(this.recentIds));
    } catch {
      // stockage indisponible : ce n'est pas grave
    }
  }

  loadRecents() {
    try {
      const saved = localStorage.getItem('recents');
      this.recentIds = saved ? JSON.parse(saved) : [];
    } catch {
      this.recentIds = [];
    }
    this.updateRecentAutos();
  }

  // Retrouve les voitures à partir de leurs identifiants
  updateRecentAutos() {
    this.recentAutos = this.recentIds
      .map(id => this.autoList.find(auto => auto.id === id))
      .filter((auto): auto is Auto => auto !== undefined);
  }

  // ----- Filtres et tri -----

  // Garde seulement les voitures qui respectent tous les filtres, puis les trie
  applyFilters() {
    const f = this.filters;
    const brandSearch = this.selectedBrand.trim().toLowerCase();

    const result = this.autoList.filter(auto =>
      auto.price >= f.minPrice &&
      auto.price <= f.maxPrice &&
      (f.model === '' || auto.model === f.model) &&
      (f.fuel === '' || auto.fuel === f.fuel) &&
      (f.transmission === '' || auto.transmission === f.transmission) &&
      (f.color === '' || auto.color === f.color) &&
      auto.year >= f.minYear &&
      (brandSearch === '' || auto.brand.toLowerCase().startsWith(brandSearch)) &&
      (!this.showOnlyFavorites || this.favoriteIds.includes(auto.id))
    );

    // Le tri choisi par le visiteur
    if (f.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (f.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (f.sortBy === 'power-desc') {
      result.sort((a, b) => b.power - a.power);
    }

    // On sépare ensuite les neuves et les occasions
    this.newAutos = result.filter(auto => auto.condition === 'neuf');
    this.usedAutos = result.filter(auto => auto.condition === 'occasion');
    this.totalCount = result.length;
  }
}
