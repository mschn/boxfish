import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getByText } from '@testing-library/dom';
import { getContainerMock } from '../../../model/container.model';
import {
  getMutationQueryMock,
  getQueryMock,
} from '../../../model/queries.mocks';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';
import { RouteService } from '../../../services/route.service';
import { ContainerTerminalComponent } from './container-terminal.component';

describe('ContainerTerminalComponent', () => {
  let component: ContainerTerminalComponent;
  let fixture: ComponentFixture<ContainerTerminalComponent>;

  const containerServiceMock: Partial<ContainerService> = {
    getContainers: () =>
      getQueryMock({
        data: signal([getContainerMock({ id: '123' })]),
      }),
    exec: () =>
      getMutationQueryMock({ mutate: jest.fn(), data: signal('exec result') }),
    resize: () => getMutationQueryMock(),
  };

  const htmlServiceMock: Partial<HtmlService> = {
    formatAnsi: (str) => str,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerTerminalComponent],
      providers: [
        {
          provide: ContainerService,
          useValue: containerServiceMock,
        },
        { provide: HtmlService, useValue: htmlServiceMock },
        {
          provide: RouteService,
          useValue: { idFromRoute: signal('123') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerTerminalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show an empty placeholder when the container is not running', () => {
    component.containers = getQueryMock({
      data: signal([getContainerMock({ id: '123', state: 'exited' })]),
    });
    fixture.detectChanges();
    expect(component.container()?.state).toBe('exited');
    expect(
      getByText(
        fixture.nativeElement,
        'The terminal is only available for running containers',
      ),
    ).toBeTruthy();
  });
});
