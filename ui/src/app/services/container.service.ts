import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import Dockerode from 'dockerode';
import { lastValueFrom } from 'rxjs';
import {
  buildContainers,
  buildStacks,
  Container,
  Stack,
} from '../model/container.model';
import { API_URL, ServerError } from '../model/server.model';

@Injectable({
  providedIn: 'root',
})
export class ContainerService {
  #http = inject(HttpClient);
  #client = inject(QueryClient);

  getContainers = () =>
    injectQuery<Dockerode.ContainerInfo[], ServerError, Container[], string[]>(
      () => this.getContainersQuery(),
    );

  fetchContainers() {
    return this.#client.fetchQuery(this.getContainersQuery());
  }

  getContainersQuery() {
    return {
      queryKey: ['containers'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<Dockerode.ContainerInfo[]>(`${API_URL}containers`, {
            withCredentials: true,
          }),
        ),
      select: (containers: Dockerode.ContainerInfo[]) =>
        buildContainers(containers),
    };
  }

  getStacks = () =>
    injectQuery<Dockerode.ContainerInfo[], ServerError, Stack[], string[]>(
      () => ({
        queryKey: ['containers'],
        queryFn: () =>
          lastValueFrom(
            this.#http.get<Dockerode.ContainerInfo[]>(`${API_URL}containers`, {
              withCredentials: true,
            }),
          ),
        select: (containers) => buildStacks(containers),
      }),
    );

  pruneContainers = () =>
    injectMutation<Dockerode.PruneContainersInfo, ServerError, void, unknown>(
      () => ({
        mutationFn: () =>
          lastValueFrom(
            this.#http.post<Dockerode.PruneContainersInfo>(
              `${API_URL}containers/prune`,
              null,
              {
                withCredentials: true,
              },
            ),
          ),
        onSuccess: () => {
          this.#client.invalidateQueries({ queryKey: ['containers'] });
        },
      }),
    );

  stopContainer = () =>
    injectMutation(() => ({
      mutationFn: (id: string) =>
        lastValueFrom(
          this.#http.put(
            `${API_URL}containers/${id}/stop`,
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

  removeContainer = () =>
    injectMutation<unknown, ServerError, string, unknown>(() => ({
      mutationFn: (id: string) =>
        lastValueFrom(
          this.#http.delete(`${API_URL}containers/${id}`, {
            withCredentials: true,
          }),
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
            `${API_URL}containers/${id}/start`,
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
    injectQuery<string, ServerError, string, string[]>(() => ({
      queryKey: ['containers', id(), 'logs'],
      enabled: id() !== '',
      queryFn: () =>
        lastValueFrom(
          this.#http.get(`${API_URL}containers/${id()}/logs`, {
            withCredentials: true,
            responseType: 'text',
          }),
        ),
    }));

  exec = () =>
    injectMutation<string, ServerError, { id: string }, unknown>(() => ({
      mutationFn: ({ id }) =>
        lastValueFrom(
          this.#http.post(
            `${API_URL}containers/${id}/exec`,
            {},
            {
              withCredentials: true,
              responseType: 'text',
            },
          ),
        ),
    }));

  resize = () =>
    injectMutation<
      unknown,
      ServerError,
      { id: string; rows: number; cols: number }
    >(() => ({
      mutationFn: ({ id, rows, cols }) =>
        lastValueFrom(
          this.#http.post(
            `${API_URL}containers/${id}/exec/resize`,
            {
              rows,
              cols,
            },
            {
              withCredentials: true,
            },
          ),
        ),
    }));
}
