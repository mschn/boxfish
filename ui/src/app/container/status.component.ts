import { Component, computed, input } from '@angular/core';

export type Status = 'up' | 'running' | 'exited' | 'created';

@Component({
  selector: 'app-status',
  imports: [],
  standalone: true,
  template: `<span class="status {{ color() }}"> </span>`,
  styles: `
    .status {
      border-radius: 1rem;
      height: 0.75rem;
      width: 0.75rem;
      display: inline-block;
    }
  `,
})
export class StatusComponent {
  status = input<string>('up');

  colors: Record<string, string> = {
    created: 'bg-gray-100',
    running: 'bg-green-500',
    exited: 'bg-gray-100',
  };

  color = computed(() => this.colors[this.status()]);
}
