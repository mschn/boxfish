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
      import('./containers/container/container.component').then(
        (c) => c.ContainerComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './containers/container/container-info/container-info.component'
          ).then((c) => c.ContainerInfoComponent),
      },
      {
        path: 'logs',
        loadComponent: () =>
          import(
            './containers/container/container-logs/container-logs.component'
          ).then((c) => c.ContainerLogsComponent),
      },
      {
        path: 'terminal',
        loadComponent: () =>
          import(
            './containers/container/container-terminal/container-terminal.component'
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
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((c) => c.SettingsComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound.component').then(
        (c) => c.NotFoundComponent,
      ),
  },
];
