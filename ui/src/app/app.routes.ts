import { Routes } from '@angular/router';
import { ContainersComponent } from './containers/containers.component';
import { HomeComponent } from './home/home.component';
import { ImagesComponent } from './images/images.component';
import { VolumesComponent } from './volumes/volumes.component';
import { ContainerComponent } from './container/container.component';

export const routes: Routes = [
  {
    path: 'containers',
    component: ContainersComponent,
  },
  {
    path: 'containers/:id',
    component: ContainerComponent,
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
