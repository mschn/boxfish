import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AttachAddon } from '@xterm/addon-attach';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { WS_API_URL } from '../../../model/server.model';
import { ContainerService } from '../../../services/container.service';
import { RouteService } from '../../../services/route.service';
import { XtermOptions } from './xterm.config';

@Component({
  selector: 'app-container-terminal',
  imports: [ButtonModule, InputTextModule, FormsModule],
  templateUrl: './container-terminal.component.html',
  host: {
    class: 'flex flex-1',
  },
  encapsulation: ViewEncapsulation.None,
  styles: `
    .xterm {
      padding: 0.75rem;
    }
  `,
})
export class ContainerTerminalComponent implements OnDestroy {
  #routeService = inject(RouteService);
  #containerService = inject(ContainerService);

  terminalElement = viewChild<ElementRef<HTMLDivElement>>('terminal');

  containers = this.#containerService.getContainers();
  container = computed(() =>
    this.containers
      .data()
      ?.find((container) => container.id === this.#routeService.idFromRoute()),
  );
  exec = this.#containerService.exec();
  resize = this.#containerService.resize();

  ws: WebSocket | undefined;
  terminal = new Terminal(XtermOptions);

  constructor() {
    effect(() => {
      // TODO effect runs twice
      const container = this.container();
      if (container?.state !== 'running') {
        return;
      }

      const terminalElt = this.terminalElement()?.nativeElement;
      if (terminalElt) {
        this.terminal.open(terminalElt);
      }

      if (container !== undefined) {
        this.exec.mutate(
          { id: container.id },
          {
            onSuccess: () => {
              this.ws = new WebSocket(
                `${WS_API_URL}containers/${container.id}/exec/ws`,
              );
              const attachAddon = new AttachAddon(this.ws);
              this.terminal.loadAddon(attachAddon);
              this.loadFitAddon();
            },
          },
        );
      }
    });
  }

  loadFitAddon() {
    const containerId = this.container()?.id;
    if (!containerId) {
      return;
    }
    const fitAddon = new FitAddon();
    this.terminal.loadAddon(fitAddon);
    fitAddon.fit();
    this.terminal.onResize(({ rows, cols }) => {
      // TODO debounce this mutation
      this.resize.mutate({ id: containerId, rows, cols });
    });
    const resizeObserver = new ResizeObserver(() => fitAddon.fit());
    resizeObserver.observe(document.querySelector('app-container-terminal')!);
  }

  ngOnDestroy() {
    this.ws?.close();
  }
}
