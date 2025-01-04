import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { getByText, queryByText } from '@testing-library/dom';
import { of } from 'rxjs';
import {
  getLoadingQueryMock,
  getQueryMock,
} from '../../../model/queries.mocks';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';
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
        { provide: ActivatedRoute, useValue: { parent: { paramMap: of({}) } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerLogsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not display logs', () => {
    component.logs = getLoadingQueryMock();
    fixture.detectChanges();
    expect(queryByText(fixture.nativeElement, 'log result')).toBeFalsy();
  });

  it('should display logs', () => {
    fixture.detectChanges();
    expect(getByText(fixture.nativeElement, 'log result')).toBeTruthy();
  });
});
