import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { Container, getContainerMock } from '../../../model/container.model';
import {
  getMutationQueryMock,
  getQueryMock,
} from '../../../model/queries.mocks';
import { ServerError } from '../../../model/server.model';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';
import { ContainerTerminalComponent } from './container-terminal.component';

describe('ContainerTerminalComponent', () => {
  let component: ContainerTerminalComponent;
  let fixture: ComponentFixture<ContainerTerminalComponent>;

  const containerServiceMock: Partial<ContainerService> = {
    containerFromRoute: getQueryMock<Container, ServerError>({
      data: signal(getContainerMock()),
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
