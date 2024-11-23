import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string;
  email: string;

  constructor(private router: Router) {
    // Asigna valores iniciales si es necesario
    this.username = 'Juan Pérez'; // Cambia esto por el valor real si es necesario
    this.email = 'juan.perez@example.com'; // Cambia esto por el valor real si es necesario
  }

  ngOnInit() {
    // Puedes obtener los valores de usuario desde el almacenamiento local o un servicio
    this.username = localStorage.getItem('username') || 'Usuario';
    this.email = localStorage.getItem('email') || 'usuario@example.com';
  }

  goBack() {
    // Redirige al dashboard
    this.router.navigate(['/dashboard']);
  }
}
