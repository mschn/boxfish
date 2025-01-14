import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { buildDf, Df, DfResponse } from '../model/df.model';
import { API_URL, ServerError, ServerInfo } from '../model/server.model';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  #http = inject(HttpClient);

  login = () =>
    injectMutation(() => ({
      mutationFn: () =>
        lastValueFrom(
          this.#http.post(`${API_URL}login`, {}, { withCredentials: true }),
        ),
    }));

  getServerInfo = () =>
    injectQuery<ServerInfo, ServerError, ServerInfo, string[]>(() => ({
      queryKey: ['server', 'info'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<ServerInfo>(`${API_URL}server`, {
            withCredentials: true,
          }),
        ),
    }));

  getDf = () =>
    injectQuery<DfResponse, ServerError, Df>(() => ({
      queryKey: ['server', 'df'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<DfResponse>(`${API_URL}df`, {
            withCredentials: true,
          }),
        ),
      select: (response) => buildDf(response),
    }));
}
