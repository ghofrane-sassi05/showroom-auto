import { TestBed } from '@angular/core/testing';
import { TestDriveForm } from './test-drive-form';

describe('TestDriveForm', () => {
  let component: TestDriveForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestDriveForm] }).compileComponents();
    component = TestBed.createComponent(TestDriveForm).componentInstance;
  });

  it('should only allow dates from tomorrow', () => {
    const today = new Date();
    const todayText = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    expect(component.minDate > todayText).toBe(true);
  });

  // 2026-10-21 est un mercredi : 09:00 → 17:00 (dernier créneau 1 h avant la fermeture)
  it('should offer one slot per hour on a weekday', () => {
    component.onDateChange('2026-10-21');
    expect(component.availableSlots[0]).toBe('09:00');
    expect(component.availableSlots[component.availableSlots.length - 1]).toBe('17:00');
    expect(component.dayMessage).toBe('');
  });

  // 2026-10-24 est un samedi : 09:00 → 13:00
  it('should offer fewer slots on Saturday', () => {
    component.onDateChange('2026-10-24');
    expect(component.availableSlots).toEqual(['09:00', '10:00', '11:00', '12:00']);
  });

  // 2026-10-25 est un dimanche : fermé
  it('should refuse Sunday', () => {
    component.onDateChange('2026-10-25');
    expect(component.availableSlots).toEqual([]);
    expect(component.dayMessage).toContain('fermé');
  });

  it('should clear everything when the date is removed', () => {
    component.onDateChange('2026-10-21');
    component.onDateChange('');
    expect(component.availableSlots).toEqual([]);
  });
});
