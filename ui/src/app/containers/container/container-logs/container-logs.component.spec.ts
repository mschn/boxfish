import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getByTestId, getByText, queryByText } from '@testing-library/dom';
import {
  getLoadingQueryMock,
  getQueryMock,
} from '../../../model/queries.mocks';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';
import { RouteService } from '../../../services/route.service';
import { ContainerLogsComponent } from './container-logs.component';

describe('ContainerLogsComponent', () => {
  let component: ContainerLogsComponent;
  let fixture: ComponentFixture<ContainerLogsComponent>;

  const containerServiceMock: Partial<ContainerService> = {
    getContainerLogs: () =>
      getQueryMock({
        data: signal('log result'),
      }),
  };

  const htmlServiceMock: Partial<HtmlService> = {
    formatAnsi: (str) => str,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerLogsComponent],
      providers: [
        { provide: ContainerService, useValue: containerServiceMock },
        {
          provide: HtmlService,
          useValue: htmlServiceMock,
        },
        {
          provide: RouteService,
          useValue: { idFromRoute: signal('123') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerLogsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display empty state', () => {
    component.logs = getQueryMock();
    fixture.detectChanges();
    expect(
      getByText(
        fixture.nativeElement,
        'This container does not have any logs yet.',
      ),
    ).toBeTruthy();
  });

  it('should display loading state', () => {
    component.logs = getLoadingQueryMock();
    fixture.detectChanges();
    expect(queryByText(fixture.nativeElement, 'log result')).toBeFalsy();
    expect(
      getByTestId(fixture.nativeElement, 'contaier-logs-placeholder'),
    ).toBeTruthy();
  });

  it('should display logs', () => {
    fixture.detectChanges();
    expect(getByText(fixture.nativeElement, 'log result')).toBeTruthy();
  });
});
