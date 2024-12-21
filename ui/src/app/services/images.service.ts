import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import Dockerode from 'dockerode';
import { lastValueFrom } from 'rxjs';
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
      Dockerode.ImageInfo[],
      string[]
    >(() => ({
      queryKey: ['images'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<Dockerode.ImageInfo[]>(`${API_URL}images`, {
            withCredentials: true,
          }),
        ),
      select: (images) =>
        images.filter((image) => image.RepoTags && image.RepoTags?.length > 0),
    }));
}
