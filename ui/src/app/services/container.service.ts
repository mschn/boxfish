import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import Dockerode from 'dockerode';
import { filter, lastValueFrom, map } from 'rxjs';

@Injectable()
export class ContainerService {
  #http = inject(HttpClient);
  #route = inject(ActivatedRoute);

  idFromRoute = toSignal(
    this.#route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      filter(Boolean),
    ),
    { initialValue: '' },
  );

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
            { withCredentials: true },
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
      enabled: id() !== '',
      queryFn: () =>
        lastValueFrom(
          this.#http.get<Dockerode.ContainerInfo>(
            `http://localhost:3000/containers/${id()}`,
            { withCredentials: true },
          ),
        ),
    }));

  containerFromRoute = this.getContainer(this.idFromRoute);
}
