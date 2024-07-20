import { Routes } from '@angular/router';
import { ContainersComponent } from './containers/containers.component';
import { HomeComponent } from './home/home.component';
import { ImagesComponent } from './images/images.component';
import { VolumesComponent } from './volumes/volumes.component';
import { ContainerComponent } from './container/container.component';
import { ContainerInfoComponent } from './container/container-info/container-info.component';
import { ContainerLogsComponent } from './container/container-logs/container-logs.component';
import { ContainerTerminalComponent } from './container/container-terminal/container-terminal.component';

export const routes: Routes = [
  {
    path: 'containers',
    component: ContainersComponent,
  },
  {
    path: 'containers/:id',
    component: ContainerComponent,
    children: [
      {
        path: '',
        component: ContainerInfoComponent,
      },
      {
        path: 'logs',
        component: ContainerLogsComponent,
      },
      {
        path: 'terminal',
        component: ContainerTerminalComponent,
      },
    ],
  },
  {
    path: 'images',
    component: ImagesComponent,
  },
  {
    path: 'volumes',
    component: VolumesComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];
