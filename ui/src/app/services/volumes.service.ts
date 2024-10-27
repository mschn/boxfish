import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import Dockerode from 'dockerode';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VolumesService {
  #http = inject(HttpClient);

  getVolumes = () =>
    injectQuery<
      Dockerode.VolumeInspectInfo[],
      Error & { error: { message: string } },
      Dockerode.VolumeInspectInfo[],
      string[]
    >(() => ({
      queryKey: ['volumes'],
      queryFn: () =>
        lastValueFrom(
          this.#http.get<Dockerode.VolumeInspectInfo[]>(
            'http://localhost:3000/volumes',
            { withCredentials: true },
          ),
        ),
    }));
}
