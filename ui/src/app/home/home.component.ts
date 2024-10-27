import { Component, computed, inject } from '@angular/core';
import { ServerService } from '../services/server.service';
import { JsonPipe } from '@angular/common';
import prettyBytes from 'pretty-bytes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  server = inject(ServerService).getServerInfo();

  serverInfo = computed(() => this.server.data()?.info);
  serverConfig = computed(() => this.server.data()?.config);
  memory = computed(() => prettyBytes(this.server.data()?.info?.MemTotal ?? 0));
}
