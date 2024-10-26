import { Component, computed, input } from '@angular/core';
import { Badge, BadgeModule } from 'primeng/badge';

export type Status = 'up' | 'running' | 'exited' | 'created';

@Component({
  selector: 'app-status',
  template: `<p-badge value=" " [severity]="color()"></p-badge>`,
  imports: [BadgeModule],
  standalone: true,
})
export class StatusComponent {
  status = input<string>('up');

  colors: Record<string, Badge['severity']> = {
    created: 'info',
    running: 'success',
    exited: 'secondary',
    up: 'success',
  };

  color = computed(() => this.colors[this.status()]);
}
