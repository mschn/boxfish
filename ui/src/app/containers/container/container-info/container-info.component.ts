import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ContainerService } from '../../../services/container.service';

@Component({
  selector: 'app-container-info',
  imports: [DatePipe, BadgeModule],
  templateUrl: './container-info.component.html',
})
export class ContainerInfoComponent {
  containerService = inject(ContainerService);
  container = this.containerService.containerFromRoute;
}
