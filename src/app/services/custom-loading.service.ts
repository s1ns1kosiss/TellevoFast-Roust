import { Injectable } from '@angular/core';
import { IonIcon } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CustomLoadingService {
  private loading: HTMLElement | null = null;

  constructor() {}

  async present(message: string = 'Cargando...') {
    this.loading = document.createElement('div');
    this.loading.className = 'custom-loading-overlay';
    this.loading.innerHTML = `
      <div class="custom-loading-content">
        <div class="car-icon">
          <ion-icon name="car-sport"></ion-icon>
        </div>
        <div class="loading-text">${message}</div>
        <div class="loading-bar"></div>
      </div>
    `;
    document.body.appendChild(this.loading);
  }

  async dismiss() {
    if (this.loading) {
      this.loading.classList.add('fade-out');
      setTimeout(() => {
        if (this.loading) {
          document.body.removeChild(this.loading);
          this.loading = null;
        }
      }, 300);
    }
  }
}
