import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { StatusComponent } from '../../components/status.component';
import { TitleComponent } from '../../components/title/title.component';
import { ContainerService } from '../../services/container.service';

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
  templateUrl: './container.component.html',
  host: {
    class: 'flex-1 w-full',
  },
})
export class ContainerComponent {
  #route = inject(ActivatedRoute);
  #containerService = inject(ContainerService);

  idFromRoute = toSignal(
    this.#route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      filter(Boolean),
    ),
    { initialValue: '' },
  );
  containers = this.#containerService.getContainers();
  container = computed(() =>
    this.containers
      .data()
      ?.find((container) => container.id === this.idFromRoute()),
  );

  links = [
    {
      name: 'Container',
      path: '',
    },
    {
      name: 'Logs',
      path: 'logs',
    },
    {
      name: 'Terminal',
      path: 'terminal',
    },
  ];
}
