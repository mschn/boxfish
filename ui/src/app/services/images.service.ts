import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import Dockerode from 'dockerode';
import { lastValueFrom } from 'rxjs';
import { buildImages, Image } from '../model/image.model';
import { API_URL } from '../model/server.model';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  #http = inject(HttpClient);

  getImages = () =>
    injectQuery<
      Dockerode.ImageInfo[],
      Error & { error: { message: string } },
      Image[],
      string[]
    >(() => ({
      queryKey: ['images'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<Dockerode.ImageInfo[]>(`${API_URL}images`, {
            withCredentials: true,
          }),
        ),
      select: (images) => buildImages(images),
    }));
}
