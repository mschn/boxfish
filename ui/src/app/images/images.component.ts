import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ImagesService } from '../services/images.service';
import { ImagesPlaceholderComponent } from './images-placeholder.component';
import { Image } from '../model/image.model';
import prettyBytes from 'pretty-bytes';
import { TitleComponent } from '../components/title/title.component';
import { ServerService } from '../services/server.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-images',
  imports: [
    TableModule,
    Message,
    ImagesPlaceholderComponent,
    ButtonModule,
    TitleComponent,
    RouterLink,
  ],
  templateUrl: './images.component.html',
  host: {
    class: 'flex-1',
  },
})
export class ImagesComponent {
  #imagesService = inject(ImagesService);
  #serverService = inject(ServerService);

  images = this.#imagesService.getImages();
  deleteImageMutation = this.#imagesService.deleteImage();
  pruneMutation = this.#imagesService.pruneImages();
  df = this.#serverService.getDf();

  prettyBytes = prettyBytes;

  deleteImage(event: MouseEvent, image: Image) {
    this.deleteImageMutation.mutate(image.id);
    event.stopPropagation();
  }

  pruneImages() {
    this.pruneMutation.mutate();
  }
}
