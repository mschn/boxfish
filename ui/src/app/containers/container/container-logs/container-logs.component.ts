import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  model,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Popover } from 'primeng/popover';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';
import { RouteService } from '../../../services/route.service';
import { ContainerLogsPlaceholderComponent } from './container-logs-placeholder.component';

@Component({
  selector: 'app-container-logs',
  imports: [
    ContainerLogsPlaceholderComponent,
    NgClass,
    FormsModule,
    Popover,
    ButtonModule,
    ToggleSwitchModule,
  ],
  templateUrl: './container-logs.component.html',
  host: {
    class: 'flex flex-1 flex-col h-full',
  },
})
export class ContainerLogsComponent {
  #routeService = inject(RouteService);
  #containerService = inject(ContainerService);
  #htmlService = inject(HtmlService);

  logEndAnchor = viewChild<ElementRef<HTMLPreElement>>('logend');

  wrapLogLines = model(false);
  wrapLinesLabel = $localize`Wrap lines`;

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
        const preElement = this.logEndAnchor()?.nativeElement;
        preElement?.scrollIntoView?.();
      }
    });
  }
}
