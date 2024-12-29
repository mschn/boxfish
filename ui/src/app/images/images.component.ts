import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ImagesService } from '../services/images.service';
import { ImagesPlaceholderComponent } from './images-placeholder.component';
import { Image } from '../model/image.model';
import prettyBytes from 'pretty-bytes';

@Component({
  selector: 'app-images',
  imports: [
    TableModule,
    MessagesModule,
    ImagesPlaceholderComponent,
    ButtonModule,
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
