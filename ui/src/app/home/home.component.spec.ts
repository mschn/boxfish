import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { getQueryMock } from '../model/queries.mocks';
import { getServerInfoMock } from '../model/server.model';
import { ServerService } from '../services/server.service';
import { HomeComponent } from './home.component';
import { getByTestId } from '@testing-library/dom';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const serverServiceMock: Partial<ServerService> = {
    getServerInfo: () => getQueryMock({ data: signal(getServerInfoMock()) }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: ServerService, useValue: serverServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display server info', () => {
    fixture.detectChanges();
    expect(
      getByTestId(fixture.nativeElement, 'server-containers').textContent,
    ).toBe('2 containers');
    expect(
      getByTestId(fixture.nativeElement, 'server-images').textContent,
    ).toBe('4 images');
    expect(getByTestId(fixture.nativeElement, 'server-cpus').textContent).toBe(
      '2 CPUs',
    );
    expect(
      getByTestId(fixture.nativeElement, 'server-memory').textContent,
    ).toBe('2.05 GB RAM');
    expect(getByTestId(fixture.nativeElement, 'server-host').textContent).toBe(
      'Host linux Ubuntu 24.04.1 LTS (aarch64)',
    );
  });
});
