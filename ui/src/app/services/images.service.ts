import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import Dockerode from 'dockerode';
import { lastValueFrom } from 'rxjs';
import { buildImages, Image } from '../model/image.model';
import { API_URL, ServerError } from '../model/server.model';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  #http = inject(HttpClient);
  #client = injectQueryClient();

  getImages = () =>
    injectQuery<Dockerode.ImageInfo[], ServerError, Image[], string[]>(() => ({
      queryKey: ['images'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<Dockerode.ImageInfo[]>(`${API_URL}images`, {
            withCredentials: true,
          }),
        ),
      select: (images) => buildImages(images),
    }));

  deleteImage = () =>
    injectMutation<unknown, ServerError, string, unknown>(() => ({
      mutationFn: (id: string) =>
        lastValueFrom(
          this.#http.delete(`${API_URL}images/${id}`, {
            withCredentials: true,
          }),
        ),
      onSuccess: () => {
        this.#client.invalidateQueries({ queryKey: ['images'] });
      },
    }));

  pruneImages = () =>
    injectMutation<Dockerode.PruneImagesInfo, ServerError, void, unknown>(
      () => ({
        mutationFn: () =>
          lastValueFrom(
            this.#http.post<Dockerode.PruneImagesInfo>(
              `${API_URL}images/prune`,
              null,
              {
                withCredentials: true,
              },
            ),
          ),
        onSuccess: () => {
          this.#client.invalidateQueries({ queryKey: ['images'] });
        },
      }),
    );
}
