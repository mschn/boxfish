import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-containers-placeholder',
  template: `<p-table
    [value]="[{}, {}, {}, {}]"
    data-testid="containers-placeholder"
  >
    <ng-template pTemplate="header">
      <tr>
        <th i18n>Name</th>
        <th i18n>Image</th>
        <th i18n>Stack</th>
        <th i18n>Status</th>
        <th i18n>Ports</th>
        <th i18n>Actions</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-container>
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
  imports: [TableModule, SkeletonModule],
})
export class ContainersPlaceholderComponent {}
