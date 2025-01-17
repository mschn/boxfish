import { Component, computed, inject } from '@angular/core';
import prettyBytes from 'pretty-bytes';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StatusComponent } from '../components/status.component';
import { ServerService } from '../services/server.service';
import { SettingsStore } from '../services/settings.store';
import { HomePlaceholderComponent } from './home-placeholder.component';
import { RouterLink } from '@angular/router';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-home',
  imports: [
    HomePlaceholderComponent,
    CardModule,
    StatusComponent,
    ButtonModule,
    RouterLink,
    MessageModule,
  ],
  templateUrl: './home.component.html',
  host: {
    class: 'w-full',
  },
})
export class HomeComponent {
  #settingsStore = inject(SettingsStore);
  #serverService = inject(ServerService);
  server = this.#serverService.getServerInfo();
  df = this.#serverService.getDf();

  serverInfo = computed(() => this.server.data()?.info);
  serverConfig = computed(() => this.server.data()?.config);
  memory = computed(() => prettyBytes(this.server.data()?.info?.MemTotal ?? 0));

  logo = computed(() =>
    this.#settingsStore.darkMode() ? 'boxfish_light.svg' : 'boxfish.svg',
  );
}
