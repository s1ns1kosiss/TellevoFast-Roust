import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log('Usuario autenticado:', user.uid);
        // El usuario está autenticado, puedes redirigir al dashboard si es necesario
        // this.router.navigate(['/dashboard']);
      } else {
        console.log('No hay usuario autenticado');
        // El usuario no está autenticado, puedes redirigir al login si es necesario
        // this.router.navigate(['/login']);
      }
    });
  }
}
