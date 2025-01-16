import { Component, computed, inject } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { ImagesService } from '../../../services/images.service';
import { RouteService } from '../../../services/route.service';

@Component({
  selector: 'app-image-info',
  templateUrl: './image-info.component.html',
  imports: [MessageModule],
})
export class ImageInfoComponent {
  #routeService = inject(RouteService);
  #imageService = inject(ImagesService);

  images = this.#imageService.getImages();
  image = computed(() =>
    this.images.data()?.find((i) => i.id === this.#routeService.idFromRoute()),
  );
}
