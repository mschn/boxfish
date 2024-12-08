import { Component, inject } from '@angular/core';
import { ContainerService } from '../../services/container.service';
import { DatePipe } from '@angular/common';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'app-container-info',
    imports: [DatePipe, BadgeModule],
    templateUrl: './container-info.component.html'
})
export class ContainerInfoComponent {
  containerService = inject(ContainerService);
  container = this.containerService.containerFromRoute;
}
