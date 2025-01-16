import { Component, computed, inject } from '@angular/core';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';
import { RouteService } from '../../../services/route.service';

@Component({
  selector: 'app-container-logs',
  imports: [],
  templateUrl: './container-logs.component.html',
})
export class ContainerLogsComponent {
  #routeService = inject(RouteService);
  #containerService = inject(ContainerService);
  #htmlService = inject(HtmlService);

  logs = this.#containerService.getContainerLogs(
    this.#routeService.idFromRoute,
  );

  coloredLogs = computed(() => {
    if (this.logs.isSuccess()) {
      return this.#htmlService.formatAnsi(this.logs.data());
    }
    return '';
  });
}
