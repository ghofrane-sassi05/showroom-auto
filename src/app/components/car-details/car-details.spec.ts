import { TestBed } from '@angular/core/testing';
import { CarDetails } from './car-details';
import { Auto } from '../../interfaces/auto';

const car: Auto = {
  id: 1, brand: 'Audi', model: 'Q5', power: 16, price: 350, photo: 'Q5.webp',
  availability: 3, description: 'Test', condition: 'neuf',
  photos: ['Q5.webp', 'Q5-2.webp'], year: 2026, fuel: 'Diesel', transmission: 'Automatique', color: 'Gris',
};

describe('CarDetails', () => {
  let component: CarDetails;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CarDetails] }).compileComponents();
    component = TestBed.createComponent(CarDetails).componentInstance;
    component.auto = car;
    component.shopPhone = '+216 71 000 000';
  });

  it('should build a WhatsApp link with digits only', () => {
    expect(component.whatsappLink.startsWith('https://wa.me/21671000000?text=')).toBe(true);
  });

  it('should ask for name and phone before sending', () => {
    component.sendInterest('', '', 'Bonjour');
    expect(component.errorMessage).not.toBe('');
    expect(component.messageSent).toBe(false);
  });

  it('should build a share link that opens this car', () => {
    expect(component.shareLink).toContain('?voiture=1');
  });

  it('should build a WhatsApp share link without a phone number', () => {
    expect(component.whatsappShareLink.startsWith('https://wa.me/?text=')).toBe(true);
  });

  it('should reset the state when closing', () => {
    component.activeTab = 'drive';
    component.messageSent = true;
    component.close();
    expect(component.activeTab).toBe('interest');
    expect(component.messageSent).toBe(false);
  });

  it('should send the clicked similar car to the parent', () => {
    let received: Auto | null = null;
    component.similarSelected.subscribe((auto: Auto) => (received = auto));
    component.openSimilar(car);
    expect(received).toBe(car);
  });
});
