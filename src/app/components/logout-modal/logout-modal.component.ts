import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-logout-modal',
  template: `
    <div class="logout-modal">
      <div class="logout-content">
        <div class="icon-container">
          <ion-icon name="log-out-outline"></ion-icon>
        </div>
        <h2>Cerrando sesión</h2>
        <p>Gracias por usar nuestra aplicación</p>
        <div class="progress-bar"></div>
      </div>
    </div>
  `,
  styles: [`
    .logout-modal {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
    }
    .logout-content {
      background-color: #ffffff;
      border-radius: 20px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      max-width: 80%;
    }
    .icon-container {
      background-color: #4a90e2;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }
    ion-icon {
      font-size: 40px;
      color: white;
    }
    h2 {
      margin: 0;
      font-size: 24px;
      color: #333;
      font-weight: 600;
    }
    p {
      margin: 10px 0 20px;
      font-size: 16px;
      color: #666;
    }
    .progress-bar {
      height: 4px;
      background-color: #e0e0e0;
      border-radius: 2px;
      overflow: hidden;
      position: relative;
    }
    .progress-bar::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0;
      background-color: #4a90e2;
      animation: progress 1.5s linear forwards;
    }
    @keyframes progress {
      0% { width: 0; }
      100% { width: 100%; }
    }
  `]
})
export class LogoutModalComponent implements OnInit {
  constructor(private animationCtrl: AnimationController) {}

  ngOnInit() {
    this.animateModal();
  }

  animateModal() {
    const animation = this.animationCtrl.create()
      .addElement(document.querySelector('.logout-content')!)
      .duration(300)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'scale(0.8) translateY(20px)', 'scale(1) translateY(0)');

    animation.play();
  }
}
