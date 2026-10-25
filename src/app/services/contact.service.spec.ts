import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
  });

  it('should build a WhatsApp link with digits only', () => {
    expect(service.whatsappLink('+216 71 000 000', 'Salut').startsWith('https://wa.me/21671000000?text=Salut')).toBe(true);
  });

  it('should build a WhatsApp link without number', () => {
    expect(service.whatsappLink('', 'Salut')).toBe('https://wa.me/?text=Salut');
  });
});
