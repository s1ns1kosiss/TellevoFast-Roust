import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  template: `
    <div class="custom-loading-screen">
      <div class="loading-content">
        <div class="logo-container">
          <img src="assets/img/logo.png" alt="FastRoust Logo" class="logo">
        </div>
        <div class="loading-text">{{ message }}</div>
        <div class="loading-spinner"></div>
      </div>
    </div>
  `,
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent {
  @Input() message: string = 'Cargando...';
}
