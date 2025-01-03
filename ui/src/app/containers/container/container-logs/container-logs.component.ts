import { Component, computed, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AnsiUp } from 'ansi_up';
import { ContainerService } from '../../../services/container.service';

@Component({
  selector: 'app-container-logs',
  imports: [],
  templateUrl: './container-logs.component.html',
  styleUrl: './container-logs.component.scss',
})
export class ContainerLogsComponent {
  #containerService = inject(ContainerService);
  #ansi_up = new AnsiUp();
  #sanitizer = inject(DomSanitizer);

  logs = this.#containerService.containerLogsFromRoute;
  coloredLogs = computed(() => {
    if (this.logs.isSuccess()) {
      const html = this.#ansi_up.ansi_to_html(this.logs.data());
      return this.#sanitizer.bypassSecurityTrustHtml(html);
    }
    return '';
  });
}
