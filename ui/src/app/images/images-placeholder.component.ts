import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-images-placeholder',
  imports: [SkeletonModule, TableModule],
  template: `<p-table [value]="[{}, {}, {}, {}]">
    <ng-template pTemplate="header">
      <tr>
        <th i18n>Name</th>
        <th i18n>Version</th>
        <th i18n>ID</th>
        <th i18n>Created</th>
        <th i18n>Size</th>
        <th i18n>Actions</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-image>
      <tr>
        <td><p-skeleton></p-skeleton></td>
        <td><p-skeleton></p-skeleton></td>
        <td><p-skeleton></p-skeleton></td>
        <td><p-skeleton></p-skeleton></td>
        <td><p-skeleton></p-skeleton></td>
        <td><p-skeleton></p-skeleton></td>
      </tr>
    </ng-template>
  </p-table>`,
})
export class ImagesPlaceholderComponent {}
