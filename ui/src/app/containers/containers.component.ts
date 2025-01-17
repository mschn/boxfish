import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import prettyBytes from 'pretty-bytes';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { StatusComponent } from '../components/status.component';
import { TitleComponent } from '../components/title/title.component';
import { ContainerService } from '../services/container.service';
import { ContainersPlaceholderComponent } from './containers-placeholder.component';

@Component({
  selector: 'app-containers',
  imports: [
    TableModule,
    Message,
    SkeletonModule,
    RouterLink,
    StatusComponent,
    TitleCasePipe,
    ButtonModule,
    TooltipModule,
    BadgeModule,
    ContainersPlaceholderComponent,
    TitleComponent,
  ],
  templateUrl: './containers.component.html',
  host: {
    class: 'flex-1 w-full',
  },
})
export class ContainersComponent {
  #containersService = inject(ContainerService);
  containers = this.#containersService.getContainers();
  start = this.#containersService.startContainer();
  stop = this.#containersService.stopContainer();
  prune = this.#containersService.pruneContainers();
  remove = this.#containersService.removeContainer();

  prettyBytes = prettyBytes;

  startContainer(event: MouseEvent, id: string) {
    this.start.mutate(id);
    event.stopPropagation();
  }

  stopContainer(event: MouseEvent, id: string) {
    this.stop.mutate(id);
    event.stopPropagation();
  }

  removeContainer(event: MouseEvent, id: string) {
    this.remove.mutate(id);
    event.stopPropagation();
  }

  pruneContainers() {
    this.prune.mutate();
  }
}
