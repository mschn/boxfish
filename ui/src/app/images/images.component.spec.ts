import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { getAllByTestId, queryByTestId } from '@testing-library/dom';
import { getImageMock } from '../model/image.model';
import {
  getLoadingQueryMock,
  getMutationQueryMock,
  getQueryMock,
} from '../model/queries.mocks';
import { ImagesService } from '../services/images.service';
import { ImagesComponent } from './images.component';

describe('ImagesComponent', () => {
  let component: ImagesComponent;
  let fixture: ComponentFixture<ImagesComponent>;

  const imagesServiceMock: Partial<ImagesService> = {
    getImages: () =>
      getQueryMock({
        data: signal([getImageMock(), getImageMock({ name: 'blob' })]),
      }),
    deleteImage: () => getMutationQueryMock(),
    pruneImages: () => getMutationQueryMock(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesComponent],
      providers: [{ provide: ImagesService, useValue: imagesServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ImagesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show the loading placeholder', () => {
    component.images = getLoadingQueryMock();
    fixture.detectChanges();
    expect(queryByTestId(fixture.nativeElement, 'images-name')).toBeFalsy();
  });

  it('should show 2 images', () => {
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, 'images-name').map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(['mschnr/boxfish', 'blob']);
  });
});
