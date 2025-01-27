import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getAllByTestId,
  getByTestId,
  queryByTestId,
} from '@testing-library/dom';
import { of } from 'rxjs';
import { getImageHistoryMock } from '../../model/image-history.model';
import { getImageMock } from '../../model/image.model';
import { getLoadingQueryMock, getQueryMock } from '../../model/queries.mocks';
import { ImagesService } from '../../services/images.service';
import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let router: Router;

  const imagesServiceMock: Partial<ImagesService> = {
    getImages: () =>
      getQueryMock({
        data: signal([getImageMock()]),
      }),
    getHistory: () =>
      getQueryMock({
        data: signal([getImageHistoryMock()]),
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageComponent],
      providers: [
        { provide: ImagesService, useValue: imagesServiceMock },
        {
          provide: Router,
          useValue: {
            events: of(undefined),
            createUrlTree: jest.fn(),
            serializeUrl: jest.fn(),
            get url() {
              return '';
            },
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: () =>
                '443a1db32605fecbfa36ebe1a86c7a5cc358476eeb3c06f37b3629bd43a1c1a0',
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show the loading placeholder', () => {
    component.images = getLoadingQueryMock();
    fixture.detectChanges();
    expect(
      getByTestId(fixture.nativeElement, 'image-placeholder'),
    ).toBeTruthy();
    expect(queryByTestId(fixture.nativeElement, 'image-version')).toBeFalsy();
  });

  it('shows the image name in the title', () => {
    jest
      .spyOn(router, 'url', 'get')
      .mockReturnValue(
        '/images/443a1db32605fecbfa36ebe1a86c7a5cc358476eeb3c06f37b3629bd43a1c1a0',
      );
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, 'breadcrumb-path').map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(['', 'images', 'mschnr/boxfish']);
  });

  it('shows the image short id in the title', () => {
    jest
      .spyOn(router, 'url', 'get')
      .mockReturnValue(
        '/images/443a1db32605fecbfa36ebe1a86c7a5cc358476eeb3c06f37b3629bd43a1c1a0',
      );
    component.images = getQueryMock({
      data: signal([getImageMock({ name: undefined })]),
    });
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, 'breadcrumb-path').map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(['', 'images', '5c7127e329c2']);
  });
});
