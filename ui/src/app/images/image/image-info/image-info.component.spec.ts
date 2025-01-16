import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getByTestId } from '@testing-library/dom';
import { of } from 'rxjs';
import { getImageHistoryMock } from '../../../model/image-history.model';
import { getImageMock } from '../../../model/image.model';
import { getQueryMock } from '../../../model/queries.mocks';
import { ImagesService } from '../../../services/images.service';
import { ImageInfoComponent } from './image-info.component';

describe('ImageInfoComponent', () => {
  let component: ImageInfoComponent;
  let fixture: ComponentFixture<ImageInfoComponent>;

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
      imports: [ImageInfoComponent],
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

    fixture = TestBed.createComponent(ImageInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show an image', () => {
    fixture.detectChanges();
    expect(
      getByTestId(fixture.nativeElement, 'image-version').textContent,
    ).toBe('1.0.2');
  });
});
