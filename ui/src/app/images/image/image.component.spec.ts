import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  getAllByTestId,
  getByTestId,
  queryByTestId,
} from '@testing-library/dom';
import { of } from 'rxjs';
import { getImageMock } from '../../model/image.model';
import { getLoadingQueryMock, getQueryMock } from '../../model/queries.mocks';
import { ImagesService } from '../../services/images.service';
import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  const imagesServiceMock: Partial<ImagesService> = {
    getImages: () =>
      getQueryMock({
        data: signal([getImageMock()]),
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageComponent],
      providers: [
        { provide: ImagesService, useValue: imagesServiceMock },
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

  it('should show an image', () => {
    fixture.detectChanges();
    expect(
      queryByTestId(fixture.nativeElement, 'image-placeholder'),
    ).toBeFalsy();
    expect(
      getByTestId(fixture.nativeElement, 'image-version').textContent,
    ).toBe('1.0.2');
  });

  it('shows the image name in the title', () => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname:
          'images/443a1db32605fecbfa36ebe1a86c7a5cc358476eeb3c06f37b3629bd43a1c1a0',
      },
    });
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, 'breadcrumb-path').map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(['', 'images', 'mschnr/boxfish']);
  });

  it('shows the image short id in the title', () => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname:
          'images/443a1db32605fecbfa36ebe1a86c7a5cc358476eeb3c06f37b3629bd43a1c1a0',
      },
    });
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
