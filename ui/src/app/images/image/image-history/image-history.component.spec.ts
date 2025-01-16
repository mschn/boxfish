import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getAllByTestId } from '@testing-library/dom';
import { getImageHistoryMock } from '../../../model/image-history.model';
import { getQueryMock } from '../../../model/queries.mocks';
import { ImagesService } from '../../../services/images.service';
import { RouteService } from '../../../services/route.service';
import { ImageHistoryComponent } from './image-history.component';

describe('ImageHistoryComponent', () => {
  let component: ImageHistoryComponent;
  let fixture: ComponentFixture<ImageHistoryComponent>;

  const imagesServiceMock: Partial<ImagesService> = {
    getHistory: () =>
      getQueryMock({
        data: signal([getImageHistoryMock()]),
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageHistoryComponent],
      providers: [
        { provide: ImagesService, useValue: imagesServiceMock },
        {
          provide: RouteService,
          useValue: { idFromRoute: signal('123') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display 3 history entries', () => {
    component.history = getQueryMock({
      data: signal([
        getImageHistoryMock({
          command: 'aaa',
        }),
        getImageHistoryMock({
          command: 'bbb',
        }),
        getImageHistoryMock({
          command: 'ccc',
        }),
      ]),
    });
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, 'image-history-command').map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(['aaa', 'bbb', 'ccc']);
  });
});
