import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../../services/images.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-image-info',
  templateUrl: './image-info.component.html',
  imports: [MessageModule],
})
export class ImageInfoComponent {
  #route = inject(ActivatedRoute);
  #imageService = inject(ImagesService);

  idFromRoute = toSignal(
    this.#route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      filter(Boolean),
    ),
    { initialValue: '' },
  );
  images = this.#imageService.getImages();
  image = computed(() =>
    this.images.data()?.find((i) => i.id === this.idFromRoute()),
  );
}
