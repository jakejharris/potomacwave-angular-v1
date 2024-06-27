import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { ConnectButtonComponent } from '../shared/connect-button/connect-button.component';

interface SubscriberIcon {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, ConnectButtonComponent],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit, AfterViewInit {
  subscriberIcons: SubscriberIcon[] = Array.from({length: 10}, (_, i) => ({
    src: `/images/icon${i + 1}.png`,
    alt: `Subscriber Icon ${i + 1}`
  }));

  private swiper: Swiper | null = null;

  ngOnInit() {
    // Any initialization logic if needed
  }

  ngAfterViewInit() {
    this.initSwiper();
  }

  private initSwiper() {
    this.swiper = new Swiper('.swiper-features', {
      modules: [Navigation, Autoplay],
      slidesPerView: 'auto',
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.features-swiper-button-next',
        prevEl: '.features-swiper-button-prev',
      },
    });
  }

  prevSlide() {
    if (this.swiper) {
      this.swiper.slidePrev();
    }
  }

  nextSlide() {
    if (this.swiper) {
      this.swiper.slideNext();
    }
  }
}