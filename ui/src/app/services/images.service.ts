import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import Dockerode from 'dockerode';
import { lastValueFrom } from 'rxjs';
import { buildImages, Image } from '../model/image.model';
import { API_URL, ServerError } from '../model/server.model';
import {
  buildImageHistory,
  ImageHistory,
  ImageHistoryResponse,
} from '../model/image-history.model';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  #http = inject(HttpClient);
  #client = inject(QueryClient);

  getImages = () =>
    injectQuery<Dockerode.ImageInfo[], ServerError, Image[]>(() => ({
      queryKey: ['images'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<Dockerode.ImageInfo[]>(`${API_URL}images`, {
            withCredentials: true,
          }),
        ),
      select: (images) => buildImages(images),
    }));

  getHistory = (id: Signal<string>) =>
    injectQuery<ImageHistoryResponse[], ServerError, ImageHistory[]>(() => ({
      queryKey: ['images', id(), 'history'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<ImageHistoryResponse[]>(
            `${API_URL}images/${id()}/history`,
            {
              withCredentials: true,
            },
          ),
        ),
      select: (response) => buildImageHistory(response),
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
        this.#client.invalidateQueries({ queryKey: ['server'] });
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
          this.#client.invalidateQueries({ queryKey: ['server'] });
        },
      }),
    );
}
