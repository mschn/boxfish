import { Component, inject } from '@angular/core';
import { ImagesService } from '../../../services/images.service';
import { RouteService } from '../../../services/route.service';

@Component({
  selector: 'app-image-history',
  templateUrl: './image-history.component.html',
  imports: [],
})
export class ImageHistoryComponent {
  #imageService = inject(ImagesService);
  #routeService = inject(RouteService);

  history = this.#imageService.getHistory(this.#routeService.idFromRoute);
}
