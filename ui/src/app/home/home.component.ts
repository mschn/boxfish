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

  memory = computed(() => prettyBytes(this.server.data()?.MemTotal ?? 0));
}
