import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import Dockerode from 'dockerode';
import { getQueryMock } from '../model/queries.mocks';
import { VolumesService } from '../services/volumes.service';
import { VolumesComponent } from './volumes.component';
import { getAllByTestId, getByText } from '@testing-library/dom';

describe('VolumesComponent', () => {
  let component: VolumesComponent;
  let fixture: ComponentFixture<VolumesComponent>;

  const volumeServiceMock: Partial<VolumesService> = {
    getVolumes: () =>
      getQueryMock({
        data: signal([
          { Name: 'foo' },
          { Name: 'bar' },
        ] as Dockerode.VolumeInspectInfo[]),
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumesComponent],
      providers: [
        {
          provide: VolumesService,
          useValue: volumeServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VolumesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display an empty placeholder', () => {
    component.volumes = getQueryMock();
    fixture.detectChanges();
    expect(
      getByText(fixture.nativeElement, 'There are no volumes'),
    ).toBeTruthy();
  });

  it('should show 2 volumes', () => {
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, 'volumes-name').map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(['foo', 'bar']);
  });
});
