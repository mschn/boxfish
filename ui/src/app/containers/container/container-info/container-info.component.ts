import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { filter, map } from 'rxjs';
import { ContainerService } from '../../../services/container.service';

@Component({
  selector: 'app-container-info',
  imports: [DatePipe, BadgeModule],
  templateUrl: './container-info.component.html',
})
export class ContainerInfoComponent {
  #route = inject(ActivatedRoute);
  #containerService = inject(ContainerService);
  #idFromRoute = toSignal(
    this.#route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      filter(Boolean),
    ),
    { initialValue: '' },
  );

  container = this.#containerService.getContainer(this.#idFromRoute);
}
