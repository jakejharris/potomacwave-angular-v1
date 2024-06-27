import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { HeroComponent } from "./hero/hero.component";
import { HowitdoneComponent } from "./howitdone/howitdone.component";
import { FeaturesComponent } from "./features/features.component";
import { TeamComponent } from "./team/team.component";
import { TestimonialsComponent } from "./testimonials/testimonials.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, HeroComponent, HowitdoneComponent, FeaturesComponent, TeamComponent, TestimonialsComponent, FooterComponent]
})
export class AppComponent {
  title = 'potomacwave-angular-v1';
}

