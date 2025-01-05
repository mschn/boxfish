import { Component, computed, inject } from '@angular/core';
import prettyBytes from 'pretty-bytes';
import { ServerService } from '../services/server.service';
import { SettingsStore } from '../services/settings.store';
import { HomePlaceholderComponent } from './home-placeholder.component';

@Component({
  selector: 'app-home',
  imports: [HomePlaceholderComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  settingsStore = inject(SettingsStore);
  server = inject(ServerService).getServerInfo();

  serverInfo = computed(() => this.server.data()?.info);
  serverConfig = computed(() => this.server.data()?.config);
  memory = computed(() => prettyBytes(this.server.data()?.info?.MemTotal ?? 0));

  logo = computed(() =>
    this.settingsStore.darkMode() ? 'boxfish_light.svg' : 'boxfish.svg',
  );
}
