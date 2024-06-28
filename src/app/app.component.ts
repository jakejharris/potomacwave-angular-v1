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
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../environments/environment';

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

  constructor(private http: HttpClient) {}

  callServerlessFunctionHello() {
    this.http.get('http://localhost:3000/api/hello?name=Angular').pipe(
      tap((response: any) => console.log(response.message)),
      catchError((error) => {
        console.error('Error calling serverless function:', error);
        return of(null);
      })
    ).subscribe();
  }

  openModal() {
    const modal = document.getElementById('connect_modal');
    if (modal) {
      (modal as any).showModal();
    }
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

  sendEmail() {
    if (!this.email) {
      this.emailError = 'Email is required';
      return;
    }
  
    this.http.post(`${environment.apiUrl}/api/save-email`, { email: this.email }).pipe(
      tap((response: any) => {
        console.log('Email saved successfully', response);
        this.email = '';
        this.emailError = '';
        alert('Your email has been recorded. Thank you for your interest!');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error saving email:', error);
        this.emailError = 'An error occurred while saving your email. Please try again.';
        return of(null);
      })
    ).subscribe();
  }
}