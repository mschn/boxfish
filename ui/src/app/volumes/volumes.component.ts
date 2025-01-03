import { Component, inject } from '@angular/core';
import { Message } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { VolumesService } from '../services/volumes.service';
import { TitleComponent } from '../components/title/title.component';

@Component({
  selector: 'app-volumes',
  imports: [TableModule, Message, SkeletonModule, TitleComponent],
  templateUrl: './volumes.component.html',
  host: {
    class: 'flex-1',
  },
})
export class VolumesComponent {
  #volumesService = inject(VolumesService);
  volumes = this.#volumesService.getVolumes();
}
