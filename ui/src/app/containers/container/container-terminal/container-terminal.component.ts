import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { filter, map } from 'rxjs';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';

@Component({
  selector: 'app-container-terminal',
  imports: [ButtonModule, InputTextModule, FormsModule],
  templateUrl: './container-terminal.component.html',
})
export class ContainerTerminalComponent {
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

  containers = this.#containerService.getContainers();
  container = computed(() =>
    this.containers
      .data()
      ?.find((container) => container.id === this.#idFromRoute()),
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
