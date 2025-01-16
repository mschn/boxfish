import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';
import { RouteService } from '../../../services/route.service';

@Component({
  selector: 'app-container-terminal',
  imports: [ButtonModule, InputTextModule, FormsModule],
  templateUrl: './container-terminal.component.html',
})
export class ContainerTerminalComponent {
  #routeService = inject(RouteService);
  #containerService = inject(ContainerService);
  #htmlService = inject(HtmlService);

  containers = this.#containerService.getContainers();
  container = computed(() =>
    this.containers
      .data()
      ?.find((container) => container.id === this.#routeService.idFromRoute()),
  );
  exec = this.#containerService.exec();

  coloredOutput = computed(() => {
    if (this.exec.isSuccess()) {
      return this.#htmlService.formatAnsi(this.exec.data());
    }
    return '';
  });

  cmd = '';

  onExec() {
    const container = this.container();
    if (container !== undefined) {
      const cmd = ['/bin/sh', '-c', this.cmd];
      this.cmd = '';
      this.exec.mutate({ id: container.id, cmd });
    }
  }
}
