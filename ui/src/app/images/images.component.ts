import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ImagesService } from '../services/images.service';
import { ImagesPlaceholderComponent } from './images-placeholder.component';
import { Image } from '../model/image.model';
import prettyBytes from 'pretty-bytes';
import { TitleComponent } from '../components/title/title.component';

@Component({
  selector: 'app-images',
  imports: [
    TableModule,
    Message,
    ImagesPlaceholderComponent,
    ButtonModule,
    TitleComponent,
  ],
  templateUrl: './images.component.html',
  host: {
    class: 'flex-1',
  },
})
export class ImagesComponent {
  #imagesService = inject(ImagesService);
  images = this.#imagesService.getImages();
  deleteImageMutation = this.#imagesService.deleteImage();
  pruneMutation = this.#imagesService.pruneImages();

  prettyBytes = prettyBytes;

  deleteImage(image: Image) {
    this.deleteImageMutation.mutate(image.id);
  }

  pruneImages() {
    this.pruneMutation.mutate();
  }
}
