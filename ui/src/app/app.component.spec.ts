import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { getByAltText, getByText } from '@testing-library/dom';
import { AppComponent } from './app.component';

@Component({
  template: 'Oink',
  selector: 'app-test',
})
class TestComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TestComponent,
        RouterModule.forRoot([{ path: '**', component: TestComponent }]),
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show home component', fakeAsync(() => {
    router.navigateByUrl('/');
    fixture.detectChanges();
    flush();
    expect(getByText(fixture.nativeElement, 'Oink')).toBeTruthy();
  }));

  it('should show light logo', () => {
    fixture.detectChanges();
    const img = getByAltText(fixture.nativeElement, 'logo') as HTMLImageElement;
    expect(img.src).toContain('boxfish_light.svg');
  });

  it('should show dark logo', () => {
    window.matchMedia = () => ({ matches: true }) as MediaQueryList;
    fixture.detectChanges();
    const img = getByAltText(fixture.nativeElement, 'logo') as HTMLImageElement;
    expect(img.src).toContain('boxfish.svg');
  });
});
