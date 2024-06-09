import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import Dockerode from 'dockerode';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContainerService {
  #http = inject(HttpClient);

  getContainers = () =>
    injectQuery(() => ({
      queryKey: ['containers'],
      queryFn: () =>
        lastValueFrom(this.#http.get<Dockerode.ContainerInfo[]>('http://localhost:3000/containers')),
    }));
}
