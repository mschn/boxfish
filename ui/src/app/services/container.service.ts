import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import Dockerode from 'dockerode';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContainerService {
  #http = inject(HttpClient);

  getContainers = () =>
    injectQuery<
      Dockerode.ContainerInfo[],
      Error & { error: { message: string } },
      Dockerode.ContainerInfo[],
      string[]
    >(() => ({
      queryKey: ['containers'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<Dockerode.ContainerInfo[]>(
            'http://localhost:3000/containers',
          ),
        ),
    }));

  getContainer = (id: Signal<string>) =>
    injectQuery<
      Dockerode.ContainerInfo,
      Error & { error: { message: string } },
      Dockerode.ContainerInfo,
      string[]
    >(() => ({
      queryKey: ['containers', id()],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<Dockerode.ContainerInfo>(
            `http://localhost:3000/containers/${id()}`,
          ),
        ),
    }));
}
