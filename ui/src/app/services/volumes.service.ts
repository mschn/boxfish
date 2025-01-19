import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { API_URL, ServerError } from '../model/server.model';
import { buildVolumes, Volume, VolumeResponse } from '../model/volume.model';

@Injectable({
  providedIn: 'root',
})
export class VolumesService {
  #http = inject(HttpClient);

  getVolumes = () =>
    injectQuery<VolumeResponse[], ServerError, Volume[], string[]>(() => ({
      queryKey: ['volumes'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<VolumeResponse[]>(`${API_URL}volumes`, {
            withCredentials: true,
          }),
        ),
      select: (volumes) => buildVolumes(volumes),
    }));
}
