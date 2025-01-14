import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  getAllByTestId,
  getByTestId,
  queryByTestId,
} from '@testing-library/dom';
import { Container, getContainerMock } from '../model/container.model';
import {
  getLoadingQueryMock,
  getMutationQueryMock,
  getQueryMock,
} from '../model/queries.mocks';
import { ServerError } from '../model/server.model';
import { ContainerService } from '../services/container.service';
import { ContainersComponent } from './containers.component';

describe('ContainersComponent', () => {
  let component: ContainersComponent;
  let fixture: ComponentFixture<ContainersComponent>;

  const containerServiceMock: Partial<ContainerService> = {
    getContainers: () =>
      getQueryMock<Container[], ServerError>({
        data: signal([
          getContainerMock({ name: 'aaa' }),
          getContainerMock({ name: 'bbb' }),
        ]),
      }),
    startContainer: () => getMutationQueryMock(),
    stopContainer: () => getMutationQueryMock(),
    pruneContainers: () => getMutationQueryMock(),
    removeContainer: () => getMutationQueryMock(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainersComponent],
      providers: [
        {
          provide: ContainerService,
          useValue: containerServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display 2 containers', () => {
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, 'containers-name').map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(['aaa', 'bbb']);
  });

  it('should show the loading overlay', () => {
    component.containers = getLoadingQueryMock();
    fixture.detectChanges();
    expect(queryByTestId(fixture.nativeElement, 'containers-name')).toBeFalsy();
    expect(
      getByTestId(fixture.nativeElement, 'containers-placeholder'),
    ).toBeTruthy();
  });
});
