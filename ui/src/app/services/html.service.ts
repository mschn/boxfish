import { inject, Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AnsiUp } from 'ansi_up';

@Injectable({
  providedIn: 'root',
})
export class HtmlService {
  #ansi_up = new AnsiUp();
  #sanitizer = inject(DomSanitizer);

  formatAnsi(str: string) {
    const html = this.#ansi_up.ansi_to_html(str);
    return this.#sanitizer.sanitize(SecurityContext.HTML, html);
  }
}
