import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { filter, map } from 'rxjs';
import { TitleComponent } from '../../components/title/title.component';
import { ImagesService } from '../../services/images.service';
import { ImagePlaceholderComponent } from './image-placeholder.component';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  imports: [MessageModule, ImagePlaceholderComponent, TitleComponent],
  host: {
    class: 'w-full',
  },
})
export class ImageComponent {
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
