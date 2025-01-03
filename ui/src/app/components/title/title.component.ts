import { Component, Signal, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  imports: [RouterLink],
})
export class TitleComponent {
  #router = inject(Router);

  routerNavigationEnd = toSignal(
    this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)),
  ) as Signal<NavigationEnd>;

  paths = computed(() => {
    let path = window.location.pathname;
    if (this.routerNavigationEnd()) {
      path = this.routerNavigationEnd().urlAfterRedirects;
    }
    const paths = path
      .split('/')
      .filter((p) => p.length > 0)
      .map((p) => ({
        url: '',
        path: p,
      }));
    paths.reduce((acc, cur) => {
      const url = `${acc}/${cur.path}`;
      cur.url = url;
      return url;
    }, '');
    return paths;
  });
}
