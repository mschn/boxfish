import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  getAllByTestId,
  getByTestId,
  queryByTestId,
} from '@testing-library/dom';
import { getContainerMock } from '../../../model/container.model';
import {
  getLoadingQueryMock,
  getQueryMock,
} from '../../../model/queries.mocks';
import { ContainerService } from '../../../services/container.service';
import { ContainerInfoComponent } from './container-info.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
describe('ContainerInfoComponent', () => {
  let component: ContainerInfoComponent;
  let fixture: ComponentFixture<ContainerInfoComponent>;

  const containerServiceMock: Partial<ContainerService> = {
    getContainers: () =>
      getQueryMock({
        data: signal([getContainerMock({ id: '123' })]),
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerInfoComponent],
      providers: [
        { provide: ContainerService, useValue: containerServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => '123' }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not display data when the query is loading', () => {
    component.containers = getLoadingQueryMock();
    fixture.detectChanges();
    expect(queryByTestId(fixture.nativeElement, 'container-image')).toBeFalsy();
  });

  it('should display a container', () => {
    fixture.detectChanges();
    expect(
      getByTestId(fixture.nativeElement, 'container-image').textContent,
    ).toBe('mschn/boxfish');
    expect(
      getByTestId(fixture.nativeElement, 'container-status').textContent,
    ).toBe('Up 6 days (unhealthy)');
    expect(
      getByTestId(fixture.nativeElement, 'container-date').textContent,
    ).toBe('Dec 12, 2024');
    expect(
      getAllByTestId(fixture.nativeElement, 'container-port').map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(['0.0.0.0:3000 → 3000/tcp', '0.0.0.0:4200 → 4200/tcp']);
  });
});
