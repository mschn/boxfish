import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';
import { RouteService } from '../../../services/route.service';
import { ContainerLogsPlaceholderComponent } from './container-logs-placeholder.component';

@Component({
  selector: 'app-container-logs',
  imports: [ContainerLogsPlaceholderComponent],
  templateUrl: './container-logs.component.html',
  host: {
    class: 'w-full h-full flex flex-1',
  },
})
export class ContainerLogsComponent {
  #routeService = inject(RouteService);
  #containerService = inject(ContainerService);
  #htmlService = inject(HtmlService);

  logsPreElement = viewChild<ElementRef<HTMLPreElement>>('logs');

  logs = this.#containerService.getContainerLogs(
    this.#routeService.idFromRoute,
  );

  coloredLogs = computed(() => {
    if (this.logs.isSuccess()) {
      return this.#htmlService.formatAnsi(this.logs.data());
    }
    return '';
  });

  constructor() {
    effect(() => {
      if (this.logs.isSuccess()) {
        const preElement = this.logsPreElement()?.nativeElement;
        preElement?.scrollTo?.(0, preElement?.scrollHeight ?? 0);
      }
    });
  }
}
