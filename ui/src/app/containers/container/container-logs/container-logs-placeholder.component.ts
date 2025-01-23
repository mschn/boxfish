import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-container-logs-placeholder',
  template: `
    <div
      class="w-full flex flex-col gap-3
   bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
      data-testid="container-logs-placeholder"
    >
      <p-skeleton width="100%" height="100vh"></p-skeleton>
    </div>
  `,
  host: {
    class: 'w-full',
  },
  imports: [SkeletonModule],
})
export class ContainerLogsPlaceholderComponent {}
