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
})
export class ContainerLogsComponent {
  #routeService = inject(RouteService);
  #containerService = inject(ContainerService);
  #htmlService = inject(HtmlService);

  scrollBotLocation = viewChild<ElementRef<HTMLDivElement>>('scrollbot');

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
        this.scrollBotLocation()?.nativeElement.scrollIntoView();
      }
    });
  }
}
