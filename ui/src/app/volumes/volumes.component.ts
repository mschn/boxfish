import { Component, inject } from '@angular/core';
import { Message } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { VolumesService } from '../services/volumes.service';

@Component({
  selector: 'app-volumes',
  imports: [TableModule, Message, SkeletonModule],
  templateUrl: './volumes.component.html',
  host: {
    class: 'flex-1',
  },
})
export class VolumesComponent {
  #volumesService = inject(VolumesService);
  volumes = this.#volumesService.getVolumes();
}
