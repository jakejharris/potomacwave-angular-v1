import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

interface Testimonial {
  quote: string;
  name: string;
  organization: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit, AfterViewInit {
  testimonials: Testimonial[] = [
    {
      quote: "The contractor is very responsive and is always willing to go above and beyond with any requests.",
      name: "GSA – PBS",
      organization: "GSA – PBS"
    },
    {
      quote: "The Contractor has provided exceptional quality in support of the VAs effort to improve FPDS-NG data quality.",
      name: "Veterans Affairs",
      organization: "Veterans Affairs"
    },
    {
      quote: "FedDataCheck has consistently gone above and beyond to provide a level of service that is beneficial to Treasury as a customer.",
      name: "Treasury",
      organization: "Treasury"
    },
    {
      quote: "The website is easy to navigate and it tracks the quality of our acquisition data on the daily basis. The communication between HHS and FedDataCheck has been established and executed well.",
      name: "Health & Human Services",
      organization: "Health & Human Services"
    },
    {
      quote: "By providing web-based dashboards and reports which has monitored overall data quality DOL has experienced improvements with FPDS.",
      name: "Labor",
      organization: "Labor"
    }
  ];

  ngOnInit() {
    // Any initialization logic if needed
  }

  ngAfterViewInit() {
    this.initSwiper();
  }

  private initSwiper() {
    new Swiper('.testimonials-swiper', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.testimonials-swiper-button-next',
        prevEl: '.testimonials-swiper-button-prev',
      },
      breakpoints: {
        1024: {
          slidesPerView: 2,
        },
      },
    });
  }
}