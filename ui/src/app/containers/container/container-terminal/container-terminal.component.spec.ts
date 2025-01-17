import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
