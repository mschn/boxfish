import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
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

  constructor(@Inject(DOCUMENT) private document: Document) {}

  toggleDayNight() {
    const theme = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (theme.href.includes('light')) {
      theme.href = 'theme-dark.css';
    } else {
      theme.href = 'theme-light.css';
    }
  }
}
