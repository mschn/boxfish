import { Component, computed, input } from '@angular/core';

export type Status = 'up' | 'running' | 'exited' | 'created';

@Component({
  selector: 'app-status',
  imports: [],
  standalone: true,
  template: `<span class="rounded-2xl w-3 h-3 inline-block {{ color() }}">
  </span>`,
})
export class StatusComponent {
  status = input<string>('up');

  colors: Record<string, string> = {
    created: 'bg-gray-100 dark:bg-gray-700',
    running: 'bg-green-500',
    exited: 'bg-gray-100 dark:bg-gray-700',
  };

  color = computed(() => this.colors[this.status()]);
}
