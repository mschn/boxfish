import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { VolumesService } from '../services/volumes.service';

@Component({
  selector: 'app-volumes',
  standalone: true,
  imports: [TableModule],
  templateUrl: './volumes.component.html',
  styleUrl: './volumes.component.scss',
})
export class VolumesComponent {
  #volumesService = inject(VolumesService);
  volumes = this.#volumesService.getVolumes();
}
