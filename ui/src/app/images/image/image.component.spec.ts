import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getByTestId, queryByTestId } from '@testing-library/dom';
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
        data: signal([getImageMock({ id: '123' })]),
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageComponent],
      providers: [
        { provide: ImagesService, useValue: imagesServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => '123' }) },
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
});
