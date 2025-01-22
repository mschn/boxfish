import { Component, signal } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { getByAltText, getByRole, getByText } from '@testing-library/dom';
import { AppComponent } from './app.component';
import { ServerService } from './services/server.service';
import { getQueryMock } from './model/queries.mocks';

@Component({
  template: 'Oink',
  selector: 'app-test',
})
class TestComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;

  const serverServiceMock: Partial<ServerService> = {
    version: () => getQueryMock({ data: signal('1.2.3') }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TestComponent,
        RouterModule.forRoot([{ path: '**', component: TestComponent }]),
      ],
      providers: [{ provide: ServerService, useValue: serverServiceMock }],
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

  it('should show the version', () => {
    fixture.detectChanges();
    expect(
      getByRole(fixture.nativeElement, 'link', { name: 'boxfish 1.2.3' }),
    ).toBeTruthy();
  });
});
