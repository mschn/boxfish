import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getByLabelText } from '@testing-library/dom';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set dark mode', () => {
    expect(component.settingsStore.darkMode()).toBe(false);
    fixture.detectChanges();
    getByLabelText(fixture.nativeElement, 'Dark theme').click();
    fixture.detectChanges();
    expect(component.settingsStore.darkMode()).toBe(true);
  });
});
