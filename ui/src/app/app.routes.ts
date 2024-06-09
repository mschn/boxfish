import { Routes } from '@angular/router';
import { ContainersComponent } from './containers/containers.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'containers',
    component: ContainersComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];
