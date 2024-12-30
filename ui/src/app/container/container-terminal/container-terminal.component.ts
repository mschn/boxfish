import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AnsiUp } from 'ansi_up';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ContainerService } from '../../services/container.service';

@Component({
  selector: 'app-container-terminal',
  imports: [ButtonModule, InputTextModule, FormsModule],
  templateUrl: './container-terminal.component.html',
  styleUrl: './container-terminal.component.scss',
})
export class ContainerTerminalComponent {
  #containerService = inject(ContainerService);
  #sanitizer = inject(DomSanitizer);
  #ansi_up = new AnsiUp();

  container = this.#containerService.containerFromRoute;
  exec = this.#containerService.exec();

  coloredOutput = computed(() => {
    if (this.exec.isSuccess()) {
      const html = this.#ansi_up.ansi_to_html(this.exec.data());
      return this.#sanitizer.bypassSecurityTrustHtml(html);
    }
    return '';
  });

  cmd = '';

  onExec() {
    if (this.container.isSuccess()) {
      // const cmd = this.cmd.split(' ');
      const cmd = ['/bin/sh', '-c', this.cmd];

      this.cmd = '';
      this.exec.mutate({ id: this.container.data().id, cmd });
    }
  }
}
