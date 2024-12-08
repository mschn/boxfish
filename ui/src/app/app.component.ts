import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Lara } from 'primeng/themes/lara';
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
    ],
    templateUrl: './app.component.html'
})
export class AppComponent {
  primeNgConfig = inject(PrimeNGConfig);

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

  constructor() {
    this.primeNgConfig.theme.set({
      preset: Lara,
      options: {
        darkModeSelector: '.dark',
      },
    });
  }
}
