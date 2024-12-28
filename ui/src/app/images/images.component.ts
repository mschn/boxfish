import { Component, inject } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ImagesService } from '../services/images.service';
import { ImagesPlaceholderComponent } from './images-placeholder.component';

@Component({
  selector: 'app-images',
  imports: [TableModule, MessagesModule, ImagesPlaceholderComponent],
  templateUrl: './images.component.html',
  host: {
    class: 'flex-1',
  },
})
export class ImagesComponent {
  #imagesService = inject(ImagesService);
  images = this.#imagesService.getImages();
}
