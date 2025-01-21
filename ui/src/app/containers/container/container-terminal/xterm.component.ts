import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AttachAddon } from '@xterm/addon-attach';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import { Container } from '../../../model/container.model';
import { WS_API_URL } from '../../../model/server.model';
import { ContainerService } from '../../../services/container.service';
import { XtermOptions } from './xterm.config';

@Component({
  selector: 'app-xterm',
  template: '<div id="terminal" #terminal></div>',
  host: {
    class: 'w-full flex-1',
  },
  encapsulation: ViewEncapsulation.None,
  styles: `
    .xterm {
      padding: 0.75rem;
    }
  `,
})
export class XtermComponent implements AfterViewChecked, OnDestroy {
  #containerService = inject(ContainerService);

  container = input.required<Container>();
  terminalElement = viewChild.required<ElementRef<HTMLDivElement>>('terminal');

  exec = this.#containerService.exec();
  resize = this.#containerService.resize();

  ws: WebSocket | undefined;
  terminal = new Terminal(XtermOptions);

  ngAfterViewChecked() {
    const terminalElt = this.terminalElement().nativeElement;
    if (terminalElt) {
      this.terminal.open(terminalElt);
    }
    const containerId = this.container().id;

    this.exec.mutate(
      { id: containerId },
      {
        onSuccess: () => {
          this.ws = new WebSocket(
            `${WS_API_URL}containers/${containerId}/exec/ws`,
          );
          const attachAddon = new AttachAddon(this.ws);
          this.terminal.loadAddon(attachAddon);
          this.loadFitAddon();
        },
      },
    );
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
