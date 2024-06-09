import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ButtonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  routes = [
    {
      name: 'Home',
      link: '/',
      icon: 'pi-home',
    },
    {
      name: 'Containers',
      link: '/containers',
      icon: 'pi-box',
    },
  ];
}
