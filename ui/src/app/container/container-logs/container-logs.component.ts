import { Component, inject } from '@angular/core';
import { ContainerService } from '../../services/container.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-container-logs',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './container-logs.component.html',
  styleUrl: './container-logs.component.scss',
})
export class ContainerLogsComponent {
  logs = inject(ContainerService).containerLogsFromRoute;
}
