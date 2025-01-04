import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { setDefaultOptions } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { isDarkTheme, setDarkTheme } from './model/darktheme';
import { getDateFnsLocale } from './model/lang.model';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    FormsModule,
    ButtonModule,
    ToggleSwitchModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  routes = [
    {
      name: $localize`Containers`,
      link: '/containers',
      icon: 'fa-cube',
    },
    {
      name: $localize`Images`,
      link: '/images',
      icon: 'fa-images',
    },
    {
      name: $localize`Volumes`,
      link: '/volumes',
      icon: 'fa-database',
      separator: true,
    },
    {
      name: $localize`Settings`,
      link: '/settings',
      icon: 'fa-sliders',
    },
  ];

  // TODO this should be an observable in a ComponentStore
  logo = isDarkTheme() ? 'boxfish.svg' : 'boxfish_light.svg';

  constructor() {
    setDefaultOptions({ locale: getDateFnsLocale() });

    if (isDarkTheme()) {
      setDarkTheme(true);
    }
  }
}
