import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import Dockerode from 'dockerode';
import { lastValueFrom } from 'rxjs';
import { API_URL, ServerError } from '../model/server.model';

@Injectable({
  providedIn: 'root',
})
export class VolumesService {
  #http = inject(HttpClient);

  getVolumes = () =>
    injectQuery<
      Dockerode.VolumeInspectInfo[],
      ServerError,
      Dockerode.VolumeInspectInfo[],
      string[]
    >(() => ({
      queryKey: ['volumes'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<Dockerode.VolumeInspectInfo[]>(`${API_URL}volumes`, {
            withCredentials: true,
          }),
        ),
    }));
}
