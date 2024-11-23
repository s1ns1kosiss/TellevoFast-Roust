import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  resetPasswordForm: FormGroup;
  verificationForm: FormGroup;
  codeSent: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.verificationForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('newPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  async resetPassword() {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.get('email')?.value;
      try {
        await this.authService.sendResetPasswordEmail(email);
        this.codeSent = true;
      } catch (error) {
        this.presentToast('Error al enviar el correo. Por favor, intenta de nuevo.');
      }
    }
  }

  async verifyCodeAndResetPassword() {
    if (this.verificationForm.valid) {
      const code = this.verificationForm.get('code')?.value;
      const newPassword = this.verificationForm.get('newPassword')?.value;
      try {
        await this.authService.resetPassword(this.resetPasswordForm.get('email')?.value, newPassword, code);
        this.presentToast('Tu contraseña ha sido restablecida con éxito.');
        this.navCtrl.navigateRoot('/login');
      } catch (error) {
        this.presentToast('Error al restablecer la contraseña. Por favor, intenta de nuevo.');
      }
    }
  }

  goBackToLogin() {
    this.navCtrl.navigateBack('/login');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
