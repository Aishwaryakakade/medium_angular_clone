import { Component, Input } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backendError.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  standalone: true,
  styleUrls: ['./backend-error-messages.component.css'],
  imports: [CommonModule],
})
export class BackendErrorMessagesComponent {
  @Input() backendErrors: BackendErrorsInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join('');
      return `${name} ${messages}`;
    });
  }
}
