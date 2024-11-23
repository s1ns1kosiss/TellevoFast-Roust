import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

interface PasswordResetRequest {
  code: string;
  createdAt: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
  used: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async sendResetPasswordEmail(email: string): Promise<void> {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const resetRequest: PasswordResetRequest = {
      code: verificationCode,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      used: false
    };

    await this.firestore.collection('passwordResetRequests').doc(email).set(resetRequest);

    // Enviar el correo de restablecimiento de contraseña
    const actionCodeSettings = {
      url: `http://localhost:8100/reset-password?email=${email}&code=${verificationCode}`,
      handleCodeInApp: true
    };
    await this.afAuth.sendPasswordResetEmail(email, actionCodeSettings);
  }

  async verifyResetCode(email: string, code: string): Promise<boolean> {
    const docRef = await this.firestore.collection('passwordResetRequests').doc(email).get().toPromise();
    if (docRef?.exists) {
      const data = docRef.data() as PasswordResetRequest;
      if (data.code === code && !data.used) {
        if (data.createdAt instanceof firebase.firestore.Timestamp) {
          const expirationTime = data.createdAt.toMillis() + 3600000; // 1 hora en milisegundos
          if (Date.now() > expirationTime) {
            return false; // El código ha expirado
          }
        }
        return true;
      }
    }
    return false;
  }

  async resetPassword(email: string, newPassword: string, code: string): Promise<void> {
    const isVerified = await this.verifyResetCode(email, code);
    if (!isVerified) {
      throw new Error('Código de verificación inválido');
    }

    try {
      // Cambiar la contraseña
      const user = await this.afAuth.currentUser;
      await user?.updatePassword(newPassword);

      // Marcar el código como usado
      await this.firestore.collection('passwordResetRequests').doc(email).update({ used: true });
    } catch (error) {
      console.error('Error al restablecer la contraseña', error);
      throw error;
    }
  }
}
