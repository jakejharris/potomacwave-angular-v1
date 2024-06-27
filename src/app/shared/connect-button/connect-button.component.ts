import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connect-button',
  templateUrl: './connect-button.component.html',
  styleUrls: ['./connect-button.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ConnectButtonComponent {
  @Input() text: string = 'Connect with us';
  @Input() additionalClasses: string = '';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }

  get buttonClasses(): string {
    return `btn btn-lg bg-[#3287cd] hover:bg-[#519edd] text-gray-100 rounded-full ${this.additionalClasses}`;
  }
}