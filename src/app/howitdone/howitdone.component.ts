import { NgFor } from '@angular/common';
import { Component, ElementRef, HostBinding, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConnectButtonComponent } from "../shared/connect-button/connect-button.component";

@Component({
    selector: 'app-howitdone',
    standalone: true,
    templateUrl: './howitdone.component.html',
    styleUrls: ['./howitdone.component.scss'],
    imports: [NgFor, ConnectButtonComponent]
})
export class HowitdoneComponent {
  @HostBinding('class') hostClass = 'w-full';
  @ViewChild('carousel') carouselElement!: ElementRef;
  slides = [
    { image: 'images/chart1.png', alt: 'Chart 1' },
    { image: 'images/chart2.png', alt: 'Chart 2' },
    { image: 'images/chart3.png', alt: 'Chart 3' },
    { image: 'images/chart4.png', alt: 'Chart 4' }
  ];
  currentSlide = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupCarouselObserver();
    }
  }

  setupCarouselObserver() {
    const carousel = this.carouselElement.nativeElement;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.currentSlide = Array.from(carousel.children).indexOf(entry.target);
          }
        });
      },
      { root: carousel, threshold: 0.5 }
    );

    Array.from(carousel.children).forEach((slide) => {
      if (slide instanceof Element) {
        observer.observe(slide);
      }
    });
  }

  prevSlide() {
    const carousel = this.carouselElement.nativeElement;
    carousel.scrollLeft -= carousel.offsetWidth;
  }

  nextSlide() {
    const carousel = this.carouselElement.nativeElement;
    carousel.scrollLeft += carousel.offsetWidth;
  }
}