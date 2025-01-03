import { Component, computed, inject } from '@angular/core';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';

@Component({
  selector: 'app-container-logs',
  imports: [],
  templateUrl: './container-logs.component.html',
})
export class ContainerLogsComponent {
  #containerService = inject(ContainerService);
  #htmlService = inject(HtmlService);

  logs = this.#containerService.containerLogsFromRoute;
  coloredLogs = computed(() => {
    if (this.logs.isSuccess()) {
      return this.#htmlService.formatAnsi(this.logs.data());
    }
    return '';
  });
}
