import { Component, OnInit, AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';
import { FirebaseService, Driver } from '../../services/firebase.service';
import { AnimationController, GestureController, ModalController, NavController, Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserProfilePage } from '../user-profile/user-profile.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LogoutModalComponent } from '../../components/logout-modal/logout-modal.component';

interface RideOption {
  name: string;
  icon: string;
  baseFare: number;
  pricePerKm: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {
  username: string = 'Usuario'; // Puedes cambiar esto por el nombre real del usuario

  map!: L.Map;
  userMarker!: L.Marker;
  
  destination: string = '';
  estimatedDistance: number = 0;
  estimatedTime: string = '';
  estimatedCost: number = 0;
  isRideRequested: boolean = false;
  rideStatus: string = '';
  driverInfo: any = null;
  selectedPaymentMethod: string = 'cash';

  isMenuExpanded: boolean = false;
  isProfileMenuOpen: boolean = false;
  userData: any;

  rideOptions: RideOption[] = [
    { name: 'Económico', icon: 'car-outline', baseFare: 1000, pricePerKm: 300 },
    { name: 'Confort', icon: 'car-sport-outline', baseFare: 1500, pricePerKm: 400 },
    { name: 'Premium', icon: 'car-sport-outline', baseFare: 2000, pricePerKm: 500 },
  ];

  selectedRideOption: RideOption | null = null;

  isLoading: boolean = false;
  loadingMessage: string = '';

  constructor(
    private platform: Platform,
    private zone: NgZone,
    private firebaseService: FirebaseService,
    private changeDetectorRef: ChangeDetectorRef,
    private animationCtrl: AnimationController,
    private gestureCtrl: GestureController,
    private firestore: AngularFirestore,
    private router: Router,
    private modalController: ModalController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const santiagoCoords: L.LatLngExpression = [-33.4569, -70.6483];

    this.map = L.map('map', {
      center: santiagoCoords,
      zoom: 13,
      zoomControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.userMarker = L.marker(santiagoCoords).addTo(this.map)
      .bindPopup('Tu ubicación')
      .openPopup();

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  searchDestination() {
    this.estimatedDistance = Math.random() * 10 + 1;
    this.estimatedTime = Math.round(this.estimatedDistance * 3) + ' minutos';
    this.animateMap();
  }

  animateMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      const animation = this.animationCtrl.create()
        .addElement(mapElement)
        .duration(300)
        .iterations(1)
        .fromTo('transform', 'scale(1)', 'scale(1.05)')
        .fromTo('transform', 'scale(1.05)', 'scale(1)');
      animation.play();
    }
  }

  selectRideOption(option: RideOption) {
    this.selectedRideOption = option;
    this.estimatedCost = this.calculatePrice(option);
  }

  calculatePrice(option: RideOption): number {
    return option.baseFare + (option.pricePerKm * this.estimatedDistance);
  }

  requestRide() {
    if (this.selectedRideOption) {
      this.isRideRequested = true;
      this.isMenuExpanded = true;
      this.rideStatus = 'Solicitando viaje';
      
      // Simulación de los estados de la solicitud
      setTimeout(() => {
        this.rideStatus = 'Conductor encontrado';
        setTimeout(() => {
          this.rideStatus = 'Conductor en camino';
          this.driverInfo = {
            name: 'Juan Pérez',
            rating: 4.8,
            image: 'assets/driver.jpg',
            car: {
              model: 'Toyota Corolla',
              year: 2020,
              plate: 'ABC123',
              image: 'assets/car.jpg'
            },
            eta: '5 minutos'
          };
        }, 2000);
      }, 2000);
    }
  }

  cancelRide() {
    this.isRideRequested = false;
    this.rideStatus = '';
    this.driverInfo = null;
    this.selectedRideOption = null;
    this.isMenuExpanded = false;
  }

  clearDestination() {
    this.destination = '';
    this.searchDestination();
  }

  animatePaymentChange() {
    const paymentElement = document.querySelector('.payment-method');
    if (paymentElement) {
      const animation = this.animationCtrl.create()
        .addElement(paymentElement)
        .duration(300)
        .iterations(1)
        .fromTo('transform', 'translateX(0)', 'translateX(10px)')
        .fromTo('transform', 'translateX(10px)', 'translateX(-10px)')
        .fromTo('transform', 'translateX(-10px)', 'translateX(0)');
      animation.play();
    }
  }

  toggleMenu() {
    if (!this.isRideRequested) {
      this.isMenuExpanded = !this.isMenuExpanded;
    }
  }

  expandMenu() {
    this.isMenuExpanded = true;
  }

  onPan(event: any) {
    const bottomSheet = document.querySelector('.bottom-sheet') as HTMLElement;
    if (!bottomSheet) return;

    if (event.deltaY < 0) {
      // Deslizando hacia arriba
      this.isMenuExpanded = true;
    } else if (event.deltaY > 0 && this.isMenuExpanded) {
      // Deslizando hacia abajo
      const threshold = bottomSheet.clientHeight * 0.4;
      if (event.deltaY > threshold) {
        this.isMenuExpanded = false;
      }
    }
  }

  getUserData() {
    console.log('Iniciando getUserData');
    // Asume que tienes el ID del usuario actual. Si no, necesitarás implementar autenticación.
    const userId = '7QV8eosI7D0rZEwQUVV0af14ubK2'; // Reemplaza esto con el ID del usuario actual
    this.firestore.collection('users').doc(userId).valueChanges().subscribe(
      (data: any) => {
        this.userData = data;
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    if (this.isProfileMenuOpen) {
      this.animateMenuItems();
    }
  }

  animateMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item, .logout-button');
    menuItems.forEach((item, index) => {
      const animation = this.animationCtrl.create()
        .addElement(item as HTMLElement)
        .duration(300)
        .delay(index * 50)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(20px)', 'translateY(0)')
        .afterClearStyles(['transform']);

      animation.play();
    });

    // Animar el avatar
    const avatar = document.querySelector('.profile-avatar') as HTMLElement;
    const avatarAnimation = this.animationCtrl.create()
      .addElement(avatar)
      .duration(1000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.05)' },
        { offset: 1, transform: 'scale(1)' }
      ]);

    avatarAnimation.play();
  }

  async openProfile() {
    const modal = await this.modalController.create({
      component: UserProfilePage,
      cssClass: 'fullscreen-modal'
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.refresh) {
      // Actualizar datos del dashboard si es necesario
    }
  }

  async openPaymentMethods() {
    await this.showLoading('Cargando métodos de pago...');
    // Simular carga (reemplazar con lógica real)
    setTimeout(() => {
      this.hideLoading();
      this.navCtrl.navigateForward('/payment-methods');
    }, 1500);
  }

  async openTripHistory() {
    await this.showLoading('Cargando historial de viajes...');
    // Simular carga (reemplazar con lógica real)
    setTimeout(() => {
      this.hideLoading();
      this.navCtrl.navigateForward('/trip-history');
    }, 1500);
  }

  async showLoading(message: string) {
    this.isLoading = true;
    this.loadingMessage = message;
    await this.animateLoadingOverlay('in');
  }

  async hideLoading() {
    await this.animateLoadingOverlay('out');
    this.isLoading = false;
    this.loadingMessage = '';
  }

  async animateLoadingOverlay(direction: 'in' | 'out') {
    const overlay = document.querySelector('.loading-overlay') as HTMLElement;
    const animation = this.animationCtrl.create()
      .addElement(overlay)
      .duration(300)
      .easing('ease-in-out');

    if (direction === 'in') {
      animation.fromTo('opacity', '0', '1');
    } else {
      animation.fromTo('opacity', '1', '0');
    }

    await animation.play();
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    if (!root) {
      return this.animationCtrl.create()
        .addElement(baseEl)
        .duration(0);
    }

    const backdropAnimation = this.animationCtrl.create()
      .addElement(root.querySelector('ion-backdrop') || baseEl)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl.create()
      .addElement(root.querySelector('.modal-wrapper') || baseEl)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' }
      ]);

    return this.animationCtrl.create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  }

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  }

  animatePageTransition() {
    const animation = this.animationCtrl.create()
      .addElement(document.body)
      .duration(300)
      .iterations(1)
      .fromTo('opacity', '0.5', '1')
      .fromTo('transform', 'scale(0.9)', 'scale(1)');

    animation.play();
  }

  async logout() {
    const modal = await this.modalController.create({
      component: LogoutModalComponent,
      cssClass: 'logout-modal',
      backdropDismiss: false
    });

    await modal.present();

    try {
      await this.firebaseService.logout();
      // La navegación ahora se maneja en el servicio Firebase
      setTimeout(async () => {
        await modal.dismiss();
      }, 2000);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      modal.dismiss();
      // Mostrar un mensaje de error al usuario
    }
  }
}
