import { Component, computed, inject } from '@angular/core';
import prettyBytes from 'pretty-bytes';
import { ServerService } from '../services/server.service';
import { HomePlaceholderComponent } from './home-placeholder.component';
import { isDarkTheme } from '../model/darktheme';

@Component({
  selector: 'app-home',
  imports: [HomePlaceholderComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  server = inject(ServerService).getServerInfo();

  serverInfo = computed(() => this.server.data()?.info);
  serverConfig = computed(() => this.server.data()?.config);
  memory = computed(() => prettyBytes(this.server.data()?.info?.MemTotal ?? 0));

  // TODO this should be an observable in a ComponentStore
  logo = isDarkTheme() ? 'boxfish_light.svg' : 'boxfish.svg';
}
