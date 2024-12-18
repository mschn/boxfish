import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'containers',
    loadComponent: () =>
      import('./containers/containers.component').then(
        (c) => c.ContainersComponent,
      ),
  },
  {
    path: 'containers/:id',
    loadComponent: () =>
      import('./container/container.component').then(
        (c) => c.ContainerComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./container/container-info/container-info.component').then(
            (c) => c.ContainerInfoComponent,
          ),
      },
      {
        path: 'logs',
        loadComponent: () =>
          import('./container/container-logs/container-logs.component').then(
            (c) => c.ContainerLogsComponent,
          ),
      },
      {
        path: 'terminal',
        loadComponent: () =>
          import(
            './container/container-terminal/container-terminal.component'
          ).then((c) => c.ContainerTerminalComponent),
      },
    ],
  },
  {
    path: 'images',
    loadComponent: () =>
      import('./images/images.component').then((c) => c.ImagesComponent),
  },
  {
    path: 'volumes',
    loadComponent: () =>
      import('./volumes/volumes.component').then((c) => c.VolumesComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
];
