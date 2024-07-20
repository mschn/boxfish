import { Component, inject } from '@angular/core';
import { ContainerService } from '../services/container.service';
import { TableModule } from 'primeng/table';
import Dockerode from 'dockerode';
import { MessagesModule } from 'primeng/messages';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-containers',
  standalone: true,
  imports: [TableModule, MessagesModule, SkeletonModule, RouterLink],
  templateUrl: './containers.component.html',
})
export class ContainersComponent {
  #containersService = inject(ContainerService);
  containers = this.#containersService.getContainers();

  getContainerPorts(container: Dockerode.ContainerInfo): string {
    const ports = container.Ports[0];
    return ports ? `${ports.PublicPort}:${ports.PrivatePort}` : '';
  }
}
