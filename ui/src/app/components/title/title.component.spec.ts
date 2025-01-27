import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TitleComponent } from './title.component';
import { getAllByTestId } from '@testing-library/dom';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;
  const events$ = new Subject();
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            events: events$,
            createUrlTree: jest.fn(),
            serializeUrl: jest.fn(),
            get url() {
              return '';
            },
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load path from url', () => {
    jest.spyOn(router, 'url', 'get').mockReturnValue('/images/32/logs');
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, 'breadcrumb-path').map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(['', 'images', '32', 'logs']);
  });

  it('should load path from router event', () => {
    events$.next(new NavigationEnd(0, '', '/containers/99/terminal'));
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, 'breadcrumb-path').map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(['', 'containers', '99', 'terminal']);
  });

  it('should replace path elements', () => {
    jest.spyOn(router, 'url', 'get').mockReturnValue('/images/32/logs');
    fixture.componentRef.setInput('pathMap', { '32': 'abc' });
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, 'breadcrumb-path').map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(['', 'images', 'abc', 'logs']);
  });
});
