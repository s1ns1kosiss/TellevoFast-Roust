import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CustomLoadingService } from '../../services/custom-loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastController: ToastController,
    private customLoadingService: CustomLoadingService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      await this.customLoadingService.present('Iniciando sesión...');
      try {
        const { email, password } = this.loginForm.value;
        const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
        
        if (userCredential.user) {
          const userDoc = await this.firestore.collection('users').doc(userCredential.user.uid).get().toPromise();
          const userData = userDoc?.data() as { username: string } | undefined;
          
          let username = userData?.username || 'Usuario';
          localStorage.setItem('username', username);
          
          await this.customLoadingService.dismiss();
          await this.presentSuccessMessage(username);
          
          setTimeout(() => {
            this.navCtrl.navigateRoot('/dashboard');
          }, 2000);
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        await this.customLoadingService.dismiss();
        await this.presentErrorToast(error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  async presentSuccessMessage(username: string) {
    const toast = await this.toastController.create({
      message: `¡Bienvenido, ${username}!<br>Sesión iniciada correctamente`,
      duration: 2000,
      position: 'middle',
      cssClass: 'success-message',
      buttons: [{ side: 'end', icon: 'car-sport', role: 'cancel' }]
    });
    await toast.present();
  }

  async presentErrorToast(error: any) {
    const toast = await this.toastController.create({
      message: `Error: ${error.message}`,
      duration: 3000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }
}
