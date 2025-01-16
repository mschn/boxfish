import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { getByTestId } from '@testing-library/dom';
import { getImageHistoryMock } from '../../../model/image-history.model';
import { getImageMock } from '../../../model/image.model';
import { getQueryMock } from '../../../model/queries.mocks';
import { ImagesService } from '../../../services/images.service';
import { RouteService } from '../../../services/route.service';
import { ImageInfoComponent } from './image-info.component';

describe('ImageInfoComponent', () => {
  let component: ImageInfoComponent;
  let fixture: ComponentFixture<ImageInfoComponent>;

  const imagesServiceMock: Partial<ImagesService> = {
    getImages: () =>
      getQueryMock({
        data: signal([getImageMock({ id: '123' })]),
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
          provide: RouteService,
          useValue: { idFromRoute: signal('123') },
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
