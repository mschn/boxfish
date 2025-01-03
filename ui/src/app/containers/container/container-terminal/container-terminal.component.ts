import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ContainerService } from '../../../services/container.service';
import { HtmlService } from '../../../services/html.service';

@Component({
  selector: 'app-container-terminal',
  imports: [ButtonModule, InputTextModule, FormsModule],
  templateUrl: './container-terminal.component.html',
})
export class ContainerTerminalComponent {
  #containerService = inject(ContainerService);
  #htmlService = inject(HtmlService);

  container = this.#containerService.containerFromRoute;
  exec = this.#containerService.exec();

  coloredOutput = computed(() => {
    if (this.exec.isSuccess()) {
      return this.#htmlService.formatAnsi(this.exec.data());
    }
    return '';
  });

  cmd = '';

  onExec() {
    if (this.container.isSuccess()) {
      const cmd = ['/bin/sh', '-c', this.cmd];
      this.cmd = '';
      this.exec.mutate({ id: this.container.data().id, cmd });
    }
  }
}
