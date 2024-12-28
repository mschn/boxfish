import { Component, inject } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { VolumesService } from '../services/volumes.service';

@Component({
  selector: 'app-volumes',
  imports: [TableModule, MessagesModule, SkeletonModule],
  templateUrl: './volumes.component.html',
  host: {
    class: 'flex-1',
  },
})
export class VolumesComponent {
  #volumesService = inject(VolumesService);
  volumes = this.#volumesService.getVolumes();
}
