import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-image-placeholder',
  template: `<div data-testid="image-placeholder" class="flex flex-row gap-3">
    <h2 class="text-lg w-20"><p-skeleton></p-skeleton></h2>
  </div>`,
  imports: [SkeletonModule],
})
export class ImagePlaceholderComponent {}
