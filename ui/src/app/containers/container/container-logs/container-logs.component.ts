import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-container-logs',
  imports: [],
  templateUrl: './container-logs.component.html',
})
export class ContainerLogsComponent {
  #route = inject(ActivatedRoute);
  #containerService = inject(ContainerService);
  #htmlService = inject(HtmlService);
  #idFromRoute = toSignal(
    this.#route.parent!.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      filter(Boolean),
    ),
    { initialValue: '' },
  );

  logs = this.#containerService.getContainerLogs(this.#idFromRoute);

  coloredLogs = computed(() => {
    if (this.logs.isSuccess()) {
      return this.#htmlService.formatAnsi(this.logs.data());
    }
    return '';
  });
}
