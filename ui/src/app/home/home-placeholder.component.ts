import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-home-placeholder',
  template: `
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-bold mb-3"
        ><p-skeleton width="25rem" height="2rem"></p-skeleton
      ></h2>
      <div><p-skeleton width="8rem"></p-skeleton></div>
      <div><p-skeleton width="10rem"></p-skeleton></div>
      <div><p-skeleton width="8rem"></p-skeleton></div>
      <div><p-skeleton width="12rem"></p-skeleton></div>
      <div><p-skeleton width="16rem"></p-skeleton></div>
      <div><p-skeleton width="11rem"></p-skeleton></div>
    </div>
  `,
  imports: [SkeletonModule],
})
export class HomePlaceholderComponent {}
