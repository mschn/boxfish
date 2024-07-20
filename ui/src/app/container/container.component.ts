import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { ContainerService } from '../services/container.service';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  #route = inject(ActivatedRoute);
  #containerService = inject(ContainerService);

  id = toSignal(
    this.#route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      filter(Boolean),
    ),
    { initialValue: '' },
  );
  container = this.#containerService.getContainer(this.id);

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
