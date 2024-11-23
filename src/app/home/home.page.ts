import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loading: boolean = true;

  constructor(private navCtrl: NavController, private loadingController: LoadingController) {
    this.showLoadingScreen();
  }

  async showLoadingScreen() {
    // Simular un retraso para la carga
    setTimeout(() => {
      this.loading = false;
    }, 3000); // Cambia el tiempo según sea necesario
  }

  irARegistro() {
    this.navCtrl.navigateForward('/register');
  }
}
