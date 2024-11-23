import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async register() {
    if (this.registerForm.valid) {
      const loading = await this.presentLoading();
      try {
        const { username, email, password } = this.registerForm.value;
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
        
        if (userCredential.user) {
          await this.firestore.collection('users').doc(userCredential.user.uid).set({
            username,
            email,
            name: username,
            phone: '',
            profileImage: '',
            createdAt: Timestamp.now()
          });
          
          await loading.dismiss();
          await this.presentSuccessToast();
          setTimeout(() => this.navCtrl.navigateRoot('/dashboard'), 2000);
        }
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        await loading.dismiss();
        await this.presentErrorToast(error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Creando tu cuenta...',
      spinner: 'crescent',
      cssClass: 'custom-loading',
      duration: 10000
    });
    await loading.present();
    return loading;
  }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Cuenta creada correctamente',
      duration: 2000,
      position: 'top',
      color: 'success',
      cssClass: 'custom-toast',
      buttons: [{ side: 'end', icon: 'checkmark-circle-outline', role: 'cancel' }]
    });
    toast.present();
  }

  async presentErrorToast(error: any) {
    const toast = await this.toastController.create({
      message: `Error: ${error.message}`,
      duration: 3000,
      position: 'top',
      color: 'danger',
      cssClass: 'custom-toast'
    });
    toast.present();
  }
}
