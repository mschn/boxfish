import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { TitleComponent } from '../../components/title/title.component';
import { ImagesService } from '../../services/images.service';
import { RouteService } from '../../services/route.service';
import { ImagePlaceholderComponent } from './image-placeholder.component';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  imports: [
    MessageModule,
    ImagePlaceholderComponent,
    TitleComponent,
    RouterLink,
    RouterLinkActive,
    NgClass,
    RouterOutlet,
  ],
  providers: [RouteService],
  host: {
    class: 'w-full',
  },
})
export class ImageComponent {
  #imageService = inject(ImagesService);
  routeService = inject(RouteService);

  images = this.#imageService.getImages();
  image = computed(() =>
    this.images.data()?.find((i) => i.id === this.routeService.idFromRoute()),
  );

  titlePathMap = computed<Record<string, string>>(() => ({
    [this.image()?.id ?? '']: this.image()?.name ?? this.image()?.shortId ?? '',
  }));

  links = [
    {
      name: $localize`Image`,
      path: '',
    },
    {
      name: $localize`History`,
      path: 'history',
    },
  ];
}
