import { Component, inject } from '@angular/core';
import { ContainerService } from '../services/container.service';

@Component({
  selector: 'app-containers',
  standalone: true,
  imports: [],
  templateUrl: './containers.component.html',
})
export class ContainersComponent {
  #containersService = inject(ContainerService);
  containers = this.#containersService.getContainers();
}
