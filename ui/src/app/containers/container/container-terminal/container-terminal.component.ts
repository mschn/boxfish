import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { WS_API_URL } from '../../../model/server.model';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';
import { RouteService } from '../../../services/route.service';

@Component({
  selector: 'app-container-terminal',
  imports: [ButtonModule, InputTextModule, FormsModule],
  templateUrl: './container-terminal.component.html',
  host: {
    class: 'flex flex-1',
  },
})
export class ContainerTerminalComponent {
  #routeService = inject(RouteService);
  #containerService = inject(ContainerService);
  #htmlService = inject(HtmlService);

  inputElement = viewChild<ElementRef<HTMLElement>>('input');

  containers = this.#containerService.getContainers();
  container = computed(() =>
    this.containers
      .data()
      ?.find((container) => container.id === this.#routeService.idFromRoute()),
  );
  exec = this.#containerService.exec();
  outputHistory = signal<SafeHtml[]>([]);

  cmd = '';
  ws: WebSocket | undefined;

  constructor() {
    effect(() => {
      const container = this.container();
      if (container !== undefined) {
        this.exec.mutate(
          { id: container.id },
          {
            onSuccess: () => {
              this.ws = new WebSocket(
                `${WS_API_URL}containers/${container.id}/exec/ws`,
              );
              this.ws.onmessage = (message) => {
                const out = this.#htmlService.formatAnsi(message.data);
                const history = this.outputHistory();
                this.outputHistory.set([...history, out]);
                setTimeout(() => {
                  this.inputElement()?.nativeElement.scrollIntoView();
                });
                return false;
              };
              this.ws.onclose = (e) => console.log('on close ', e);
              this.ws.onerror = (e) => console.log('on error', e);
            },
          },
        );
      }
    });
  }

  onExec() {
    this.ws?.send(this.cmd);
    this.cmd = '';
  }
}
