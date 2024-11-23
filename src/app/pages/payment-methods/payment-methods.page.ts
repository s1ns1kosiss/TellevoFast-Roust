import { Component, OnInit } from '@angular/core';
import { FirebaseService, PaymentMethod } from '../../services/firebase.service';
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
})
export class PaymentMethodsPage implements OnInit {
  paymentMethods: PaymentMethod[] = [];
  isLoading: boolean = false;
  isAddPaymentMethodModalOpen: boolean = false;
  paymentMethodForm: FormGroup;
  showSuccessMessage: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private alertController: AlertController,
    private toastController: ToastController,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.paymentMethodForm = this.formBuilder.group({
      cardHolderName: ['', [Validators.required, Validators.minLength(3)]],
      type: ['credit', Validators.required],
      lastFourDigits: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]],
    });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log('Usuario autenticado en PaymentMethodsPage:', user.uid);
        this.loadPaymentMethods();
      } else {
        console.log('No hay usuario autenticado en PaymentMethodsPage');
        // Redirigir al login si no hay usuario autenticado
        this.router.navigate(['/login']);
      }
    });
  }

  loadPaymentMethods() {
    this.isLoading = true;
    console.log('Iniciando carga de métodos de pago en la página');
    this.firebaseService.getPaymentMethods().subscribe(
      (methods) => {
        console.log('Métodos de pago recibidos en la página:', methods);
        this.paymentMethods = methods;
        this.isLoading = false;
        if (methods.length === 0) {
          console.log('No se encontraron métodos de pago para este usuario');
          // Aquí puedes mostrar un mensaje al usuario o tomar otra acción
        }
      },
      (error) => {
        console.error('Error al cargar los métodos de pago:', error);
        this.isLoading = false;
      }
    );
  }

  showAddPaymentMethodModal() {
    this.isAddPaymentMethodModalOpen = true;
  }

  addPaymentMethod() {
    if (this.paymentMethodForm.valid) {
      const newPaymentMethod: PaymentMethod = {
        ...this.paymentMethodForm.value,
        isDefault: this.paymentMethods.length === 0 // Si es la primera tarjeta, será la predeterminada
      };
      
      this.firebaseService.addPaymentMethod(newPaymentMethod).subscribe(
        () => {
          this.isAddPaymentMethodModalOpen = false;
          this.showSuccessMessage = true;
          this.loadPaymentMethods(); // Recarga los métodos de pago
          
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        },
        (error) => {
          console.error('Error al agregar método de pago:', error);
          this.presentToast('Error al agregar método de pago', 'danger');
        }
      );
    }
  }

  deletePaymentMethod(id?: string) {
    if (!id) return; // Si no hay id, no hacemos nada
    
    this.alertController.create({
      header: '¿Estás seguro?',
      message: '¿Quieres eliminar esta tarjeta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.firebaseService.deletePaymentMethod(id).subscribe(
              () => {
                this.presentToast('Tarjeta eliminada con éxito');
                this.loadPaymentMethods(); // Recarga los métodos de pago
              },
              error => {
                console.error('Error al eliminar la tarjeta:', error);
                this.presentToast('Error al eliminar la tarjeta', 'danger');
              }
            );
          }
        }
      ]
    }).then(alert => alert.present());
  }

  async setDefaultPaymentMethod(paymentMethodId: string) {
    const updates = this.paymentMethods.map(method => 
      this.firebaseService.updatePaymentMethod(method.id!, { isDefault: false })
    );

    updates.push(this.firebaseService.updatePaymentMethod(paymentMethodId, { isDefault: true }));

    Promise.all(updates)
      .then(() => this.presentToast('Método de pago predeterminado actualizado'))
      .catch(error => {
        console.error('Error al actualizar método de pago predeterminado:', error);
        this.presentToast('Error al actualizar método de pago predeterminado', 'danger');
      });
  }

  private async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  getCardBrand(lastFourDigits: string): string {
    // Aquí puedes implementar la lógica para determinar la marca de la tarjeta
    // basándote en los últimos 4 dígitos. Por ahora, retornemos un valor genérico:
    return 'Tarjeta';
  }

  get cardHolderName() { return this.paymentMethodForm.get('cardHolderName'); }
  get lastFourDigits() { return this.paymentMethodForm.get('lastFourDigits'); }
  get expirationDate() { return this.paymentMethodForm.get('expirationDate'); }
}
