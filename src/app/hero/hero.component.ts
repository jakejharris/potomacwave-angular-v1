import { Component, HostBinding, Output, EventEmitter } from '@angular/core';
import { ConnectButtonComponent } from '../shared/connect-button/connect-button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ConnectButtonComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  @HostBinding('class') hostClass = 'w-full';
  @Output() connectClicked = new EventEmitter<void>();

  onConnectClicked() {
    this.connectClicked.emit();
  }
}