import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "./header/header.component";
import { HeroComponent } from "./hero/hero.component";
import { HowitdoneComponent } from "./howitdone/howitdone.component";
import { FeaturesComponent } from "./features/features.component";
import { TeamComponent } from "./team/team.component";
import { TestimonialsComponent } from "./testimonials/testimonials.component";
import { FooterComponent } from "./footer/footer.component";
import { ConnectButtonComponent } from "./shared/connect-button/connect-button.component";
import { DatabaseService } from './database.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        CommonModule,
        RouterOutlet,
        FormsModule,
        HeaderComponent,
        HeroComponent,
        HowitdoneComponent,
        FeaturesComponent,
        TeamComponent,
        TestimonialsComponent,
        FooterComponent,
        ConnectButtonComponent
    ]
})
export class AppComponent {
  title = 'potomacwave-angular-v1';
  email: string = '';
  emailError: string = '';

  constructor(private databaseService: DatabaseService) {}

  openModal() {
    const modal = document.getElementById('connect_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  sendEmail() {
    if (!this.email) {
      this.emailError = 'Email is required';
      return;
    }

    this.databaseService.saveEmail(this.email).subscribe({
      next: (response) => {
        console.log('Email saved successfully', response);
        this.email = '';
        this.emailError = '';
        alert('Your email has been recorded. Thank you for your interest!');
      },
      error: (error) => {
        console.error('Error saving email:', error);
        this.emailError = 'An error occurred while saving your email. Please try again.';
      }
    });
  }

  closeModal() {
    if (!this.email) {
      this.emailError = 'Email is required';
      return;
    }
    const modal = document.getElementById('connect_modal');
    if (modal) {
      (modal as any).close();
    }
  }
}