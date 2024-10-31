import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContainerService } from '../services/container.service';
import { StatusComponent } from './status.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    StatusComponent,
    NgClass,
  ],
  providers: [ContainerService],
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  containerService = inject(ContainerService);
  container = this.containerService.containerFromRoute;

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
