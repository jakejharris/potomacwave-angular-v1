import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SubscriberIcon {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent implements AfterViewInit {
  @ViewChild('carousel') carouselElement?: ElementRef;

  subscriberIcons: SubscriberIcon[] = Array.from({length: 10}, (_, i) => ({
    src: `/images/icon${i + 1}.png`,
    alt: `Subscriber Icon ${i + 1}`
  }));

  ngAfterViewInit() {
    if (this.carouselElement) {
      this.setupDraggableCarousel();
    }
  }

  setupDraggableCarousel() {
    if (!this.carouselElement) return;

    const carousel = this.carouselElement.nativeElement;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    carousel.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('active');
    });

    carousel.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }

  prevSlide() {
    if (this.carouselElement) {
      this.carouselElement.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  nextSlide() {
    if (this.carouselElement) {
      this.carouselElement.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }
}