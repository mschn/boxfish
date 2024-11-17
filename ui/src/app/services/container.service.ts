import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import Dockerode from 'dockerode';
import { filter, lastValueFrom, map } from 'rxjs';
import {
  buildContainer,
  buildContainers,
  buildStacks,
  Container,
  Stack,
} from '../model/container.model';

@Injectable()
export class ContainerService {
  #http = inject(HttpClient);
  #route = inject(ActivatedRoute);
  #client = injectQueryClient();

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
      Container[],
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
      select: (containers) => buildContainers(containers),
    }));

  getStacks = () =>
    injectQuery<
      Dockerode.ContainerInfo[],
      Error & { error: { message: string } },
      Stack[],
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
      select: (containers) => buildStacks(containers),
    }));

  getContainer = (id: Signal<string>) =>
    injectQuery<
      Dockerode.ContainerInfo,
      Error & { error: { message: string } },
      Container,
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
      select: (container) => buildContainer(container),
    }));

  stopContainer = () =>
    injectMutation(() => ({
      mutationFn: (id: string) =>
        lastValueFrom(
          this.#http.put(
            `http://localhost:3000/containers/${id}/stop`,
            {},
            {
              withCredentials: true,
            },
          ),
        ),
      onSuccess: () => {
        this.#client.invalidateQueries({ queryKey: ['containers'] });
      },
    }));

  startContainer = () =>
    injectMutation(() => ({
      mutationFn: (id: string) =>
        lastValueFrom(
          this.#http.put(
            `http://localhost:3000/containers/${id}/start`,
            {},
            {
              withCredentials: true,
            },
          ),
        ),
      onSuccess: () => {
        this.#client.invalidateQueries({ queryKey: ['containers'] });
      },
    }));

  getContainerLogs = (id: Signal<string>) =>
    injectQuery<
      string,
      Error & { error: { message: string } },
      string,
      string[]
    >(() => ({
      queryKey: ['containers', id(), 'logs'],
      enabled: id() !== '',
      queryFn: () =>
        lastValueFrom(
          this.#http.get(`http://localhost:3000/containers/${id()}/logs`, {
            withCredentials: true,
            responseType: 'text',
          }),
        ),
    }));

  containerFromRoute = this.getContainer(this.idFromRoute);
  containerLogsFromRoute = this.getContainerLogs(this.idFromRoute);
}
