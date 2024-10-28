import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { StatusComponent } from '../container/status.component';
import { ContainerService } from '../services/container.service';

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
  ],
  providers: [ContainerService],
  templateUrl: './containers.component.html',
})
export class ContainersComponent {
  #containersService = inject(ContainerService);
  containers = this.#containersService.getContainers();
}
