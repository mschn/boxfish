import { Component, inject } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { TableModule } from 'primeng/table';
import Dockerode from 'dockerode';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [TableModule],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
})
export class ImagesComponent {
  #imagesService = inject(ImagesService);
  images = this.#imagesService.getImages();

  getName(image: Dockerode.ImageInfo): string {
    return image.RepoTags?.[0].split(':')[0] ?? '';
  }

  getVersion(image: Dockerode.ImageInfo): string {
    return image.RepoTags?.[0].split(':')[1] ?? '';
  }
}
