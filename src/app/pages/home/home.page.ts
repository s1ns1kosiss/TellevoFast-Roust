import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  welcomeMessage: string = '';  // Inicializa con una cadena vacía

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    const username = localStorage.getItem('username') || 'Usuario';
    console.log(`Bienvenido, ${username}`);
    this.welcomeMessage = `Bienvenido, ${username}`;
  }
}