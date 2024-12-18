import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { ServerInfo } from '../model/server.model';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  #http = inject(HttpClient);

  login = () =>
    injectMutation(() => ({
      mutationFn: () =>
        lastValueFrom(
          this.#http.post(
            'http://localhost:3000/login',
            {},
            { withCredentials: true },
          ),
        ),
    }));

  getServerInfo = () =>
    injectQuery<
      ServerInfo,
      Error & { error: { message: string } },
      ServerInfo,
      string[]
    >(() => ({
      queryKey: ['server'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<ServerInfo>('http://localhost:3000/server', {
            withCredentials: true,
          }),
        ),
    }));
}
