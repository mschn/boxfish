import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ContainerService } from '../../../services/container.service';
import { RouteService } from '../../../services/route.service';
import { XtermComponent } from './xterm.component';

@Component({
  selector: 'app-container-terminal',
  imports: [ButtonModule, InputTextModule, FormsModule, XtermComponent],
  templateUrl: './container-terminal.component.html',
  host: {
    class: 'flex flex-1 h-full w-full',
  },
})
export class ContainerTerminalComponent {
  #routeService = inject(RouteService);
  #containerService = inject(ContainerService);

  containers = this.#containerService.getContainers();
  container = computed(() =>
    this.containers
      .data()
      ?.find((container) => container.id === this.#routeService.idFromRoute()),
  );
}
