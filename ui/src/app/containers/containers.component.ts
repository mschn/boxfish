import { KeyValuePipe, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { StatusComponent } from '../container/status.component';
import { ContainerService } from '../services/container.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { ContainersPlaceholderComponent } from './containers-placeholder.component';

@Component({
  selector: 'app-containers',
  standalone: true,
  imports: [
    TableModule,
    MessagesModule,
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
})
export class ContainersComponent {
  #containersService = inject(ContainerService);
  containers = this.#containersService.getContainers();
  start = this.#containersService.startContainer();
  stop = this.#containersService.stopContainer();

  startContainer(id: string) {
    this.start.mutate(id);
  }

  stopContainer(id: string) {
    this.stop.mutate(id);
  }
}
