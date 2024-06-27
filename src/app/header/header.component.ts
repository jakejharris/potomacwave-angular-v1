import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  scrollTo(elementId: string): void {
    const element = this.document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      // Close mobile menu if open
      const mobileMenu = this.document.querySelector('.dropdown-content');
      if (mobileMenu) {
        (mobileMenu as HTMLElement).style.display = 'none';
      }
    }
  }
}
