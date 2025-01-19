import { Component, computed, inject } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { VolumesService } from '../../services/volumes.service';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  providers: [RouteService],
})
export class VolumeComponent {
  #volumeService = inject(VolumesService);
  #routeService = inject(RouteService);

  volumes = this.#volumeService.getVolumes();
  volume = computed(() =>
    this.volumes
      .data()
      ?.find((i) => i.Name === this.#routeService.idFromRoute()),
  );
}
