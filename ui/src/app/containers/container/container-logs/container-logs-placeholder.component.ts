import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-container-logs-placeholder',
  template: `
    <div
      class="flex flex-col gap-3
   bg-gray-100 dark:bg-gray-800 dark:text-gray-100 
    mt-3 rounded-md border border-gray-200 dark:border-gray-700"
    >
      <p-skeleton width="100%" height="20rem"></p-skeleton>
    </div>
  `,
  imports: [SkeletonModule],
})
export class ContainerLogsPlaceholderComponent {}
