import { Component, OnInit } from '@angular/core';
import { FirebaseService, UserProfile } from '../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, ModalController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userProfile: UserProfile | null = null;
  isEditing = false;
  userId: string | null = null;
  selectedSegment = 'info';
  maxDate: string;
  isLoading$ = new BehaviorSubject<boolean>(true);
  createdAtIso: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router
  ) {
    this.maxDate = new Date().toISOString();
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log('Usuario autenticado:', user);
        this.userId = user.uid;
        this.firebaseService.getUserProfile(this.userId).subscribe(
          (profile: UserProfile | null) => {
            console.log('Perfil recibido de Firebase:', profile);
            if (profile) {
              this.userProfile = profile;
              this.createdAtIso = profile.createdAt.toDate().toISOString();
              console.log('Perfil de usuario cargado:', this.userProfile);
            } else {
              console.log('No se encontró perfil, creando uno por defecto');
              this.createDefaultProfile(user.uid, user.email || '');
            }
            this.isLoading$.next(false);
          },
          (error: any) => {
            console.error('Error al obtener el perfil:', error);
            this.isLoading$.next(false);
            this.showToast('Error al cargar el perfil', 'danger');
          }
        );
      } else {
        this.isLoading$.next(false);
        console.log('No hay usuario autenticado');
        this.showToast('No se pudo autenticar al usuario', 'warning');
      }
    });
  }

  createDefaultProfile(uid: string, email: string) {
    const defaultProfile: UserProfile = {
      createdAt: Timestamp.now(),
      email: email,
      name: email.split('@')[0], // Usa la parte del email antes del @ como nombre por defecto
      phone: '',
      profileImage: '',
      username: email.split('@')[0] // Usa la parte del email antes del @ como nombre de usuario por defecto
    };
    this.firebaseService.setUserProfile(uid, defaultProfile)
      .then(() => {
        this.userProfile = defaultProfile;
        this.createdAtIso = defaultProfile.createdAt.toDate().toISOString();
        console.log('Perfil por defecto creado:', this.userProfile);
        this.isLoading$.next(false);
        this.showToast('Perfil creado', 'success');
      })
      .catch(error => {
        console.error('Error al crear perfil por defecto:', error);
        this.showToast(`Error al crear perfil: ${error.message}`, 'danger');
        this.isLoading$.next(false);
      });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  async updateProfile() {
    if (this.userProfile && this.userId) {
      try {
        await this.firebaseService.updateUserProfile(this.userId, this.userProfile);
        console.log('Perfil actualizado:', this.userProfile);
        this.isEditing = false;
        this.showToast('Perfil actualizado con éxito', 'success');
        this.dismissModal(true);
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        this.showToast('Error al actualizar el perfil', 'danger');
      }
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (this.userProfile && e.target?.result) {
          this.userProfile.profileImage = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    await toast.present();
  }

  onDateChange(event: any) {
    if (this.userProfile) {
      const selectedDate = new Date(event.detail.value);
      this.userProfile.createdAt = Timestamp.fromDate(selectedDate);
      this.createdAtIso = selectedDate.toISOString();
    }
  }

  formatDate(timestamp: Timestamp): string {
    return timestamp.toDate().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  dismissModal(refresh: boolean = false) {
    this.modalController.dismiss({
      refresh: refresh
    });
  }

  navigateTo(page: string) {
    switch(page) {
      case 'profile':
        // Ya estamos en la página de perfil, no necesitamos navegar
        break;
      case 'payment-methods':
        this.router.navigate(['/payment-methods']);
        break;
      case 'trip-history':
        this.router.navigate(['/trip-history']);
        break;
    }
  }
}
