import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContainerService } from '../services/container.service';
import { StatusComponent } from './status.component';
import { NgClass } from '@angular/common';
import { TitleComponent } from '../components/title/title.component';

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
  providers: [ContainerService],
  templateUrl: './container.component.html',
  host: {
    class: 'flex-1 w-full',
  },
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
