import { Component, inject } from '@angular/core';
import { ContainerService } from '../../services/container.service';
import { DatePipe } from '@angular/common';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-container-info',
  standalone: true,
  imports: [DatePipe, BadgeModule],
  templateUrl: './container-info.component.html',
  styleUrl: './container-info.component.scss',
})
export class ContainerInfoComponent {
  containerService = inject(ContainerService);
  container = this.containerService.containerFromRoute;
}
