import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StatusComponent } from '../../components/status.component';
import { TitleComponent } from '../../components/title/title.component';
import { ContainerService } from '../../services/container.service';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-container',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    StatusComponent,
    NgClass,
    TitleComponent,
  ],
  providers: [RouteService],
  templateUrl: './container.component.html',
  host: {
    class: 'flex-1 flex flex-col w-full',
  },
})
export class ContainerComponent {
  routeService = inject(RouteService);
  #containerService = inject(ContainerService);

  containers = this.#containerService.getContainers();
  container = computed(() =>
    this.containers
      .data()
      ?.find((container) => container.id === this.routeService.idFromRoute()),
  );

  titlePathMap = computed<Record<string, string>>(() => {
    const id = this.container()?.id ?? '';
    return { [id]: this.container()?.name ?? '' };
  });

  links = [
    {
      name: $localize`Container`,
      path: '',
    },
    {
      name: $localize`Logs`,
      path: 'logs',
    },
    {
      name: $localize`Terminal`,
      path: 'terminal',
    },
  ];
}
