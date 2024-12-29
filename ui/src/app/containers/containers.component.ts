import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { StatusComponent } from '../container/status.component';
import { ContainerService } from '../services/container.service';
import { ContainersPlaceholderComponent } from './containers-placeholder.component';
import prettyBytes from 'pretty-bytes';

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
  ],
  providers: [ContainerService],
  templateUrl: './containers.component.html',
  host: {
    class: 'flex-1',
  },
})
export class ContainersComponent {
  #containersService = inject(ContainerService);
  containers = this.#containersService.getContainers();
  start = this.#containersService.startContainer();
  stop = this.#containersService.stopContainer();
  prune = this.#containersService.pruneContainers();

  prettyBytes = prettyBytes;

  startContainer(id: string) {
    this.start.mutate(id);
  }

  stopContainer(id: string) {
    this.stop.mutate(id);
  }

  pruneContainers() {
    this.prune.mutate();
  }
}
