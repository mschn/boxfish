import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { ImagesService } from '../../../services/images.service';

@Component({
  selector: 'app-image-history',
  templateUrl: './image-history.component.html',
  imports: [],
})
export class ImageHistoryComponent {
  #imageService = inject(ImagesService);
  #route = inject(ActivatedRoute);
  #idFromRoute = toSignal(
    this.#route.parent!.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      filter(Boolean),
    ),
    { initialValue: '' },
  );

  history = this.#imageService.getHistory(this.#idFromRoute);
}
