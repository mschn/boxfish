import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import Dockerode from 'dockerode';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  #http = inject(HttpClient);

  getImages = () =>
    injectQuery(() => ({
      queryKey: ['images'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<Dockerode.ImageInfo[]>('http://localhost:3000/images'),
        ),
      select: (images) =>
        images.filter((image) => image.RepoTags && image.RepoTags?.length > 0),
    }));
}
