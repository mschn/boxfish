import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Aura } from 'primeng/themes/aura';
import { Lara } from 'primeng/themes/lara';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, ButtonModule, InputSwitchModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  #document = inject(DOCUMENT);
  primeNgConfig = inject(PrimeNGConfig);
  darkTheme = false;

  routes = [
    {
      name: 'Containers',
      link: '/containers',
      icon: 'pi-box',
    },
    {
      name: 'Images',
      link: '/images',
      icon: 'pi-images',
    },
    {
      name: 'Volumes',
      link: '/volumes',
      icon: 'pi-database',
    },
  ];

  constructor() {
    this.primeNgConfig.theme.set({ preset: Lara });
  }

  toggleDayNight() {}
  //   const theme = this.getHtmlTheme();
  //   if (theme.href.includes('light')) {
  //     theme.href = 'theme-dark.css';
  //     this.darkTheme = true;
  //   } else {
  //     theme.href = 'theme-light.css';
  //     this.darkTheme = false;
  //   }
  // }
}
