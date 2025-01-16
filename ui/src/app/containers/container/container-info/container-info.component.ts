import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ContainerService } from '../../../services/container.service';
import { RouteService } from '../../../services/route.service';

@Component({
  selector: 'app-container-info',
  imports: [DatePipe, BadgeModule],
  templateUrl: './container-info.component.html',
})
export class ContainerInfoComponent {
  #routeService = inject(RouteService);
  #containerService = inject(ContainerService);

  containers = this.#containerService.getContainers();
  container = computed(() =>
    this.containers
      .data()
      ?.find((container) => container.id === this.#routeService.idFromRoute()),
  );
}
