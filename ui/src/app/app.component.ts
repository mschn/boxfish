import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ThemeToggleComponent } from './theme-switch.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    FormsModule,
    ButtonModule,
    ToggleSwitchModule,
    ThemeToggleComponent,
    RouterLink,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  routes = [
    {
      name: $localize`Containers`,
      link: '/containers',
      icon: 'pi-box',
    },
    {
      name: $localize`Images`,
      link: '/images',
      icon: 'pi-images',
    },
    {
      name: $localize`Volumes`,
      link: '/volumes',
      icon: 'pi-database',
    },
  ];
}
