import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';

export interface Driver {
  name: string;
  rating: number;
  car: {
    image: string;
    model: string;
    plate: string;
    year: number;
  };
  image: string;
  eta?: string; // Añadimos eta como una propiedad opcional
}

export interface Trip {
  id?: string;
  userId: string;
  driverId: string;
  origin: string;
  destination: string;
  date: Date;
  cost: number;
  distance: number;
  duration: number;
}

export interface UserProfile {
  createdAt: Timestamp;
  email: string;
  name: string;
  phone: string;
  profileImage: string;
  username: string;
}

export interface PaymentMethod {
  id?: string;
  cardHolderName: string;
  lastFourDigits: string;
  expirationDate: string;
  type: 'credit' | 'debit';
  isDefault: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  getRandomDriver(): Observable<Driver> {
    return this.firestore.collection<Driver>('drivers')
      .valueChanges({ idField: 'id' })
      .pipe(
        map(drivers => {
          const randomIndex = Math.floor(Math.random() * drivers.length);
          return drivers[randomIndex];
        })
      );
  }

  getAllDrivers(): Observable<Driver[]> {
    return this.firestore.collection<Driver>('drivers')
      .valueChanges({ idField: 'id' });
  }

  getUserTrips(userId: string): Observable<Trip[]> {
    return this.firestore.collection<Trip>('trips', ref => 
      ref.where('userId', '==', userId).orderBy('date', 'desc')
    ).valueChanges({ idField: 'id' });
  }

  getUserProfile(userId: string): Observable<UserProfile | null> {
    return this.firestore.collection('active_users').doc(userId).valueChanges()
      .pipe(
        map((data: any) => {
          if (data) {
            return {
              createdAt: data.createdAt,
              email: data.email,
              name: data.name || '',
              phone: data.phone || '',
              profileImage: data.profileImage || '',
              username: data.username || ''
            };
          }
          return null;
        })
      );
  }

  setUserProfile(userId: string, profile: UserProfile): Promise<void> {
    return this.firestore.collection('active_users').doc(userId).set(profile, { merge: true });
  }

  updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
    return this.firestore.collection('active_users').doc(userId).set(profile, { merge: true });
  }

  private getCurrentUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map(user => user ? user.uid : null)
    );
  }

  getPaymentMethods(): Observable<PaymentMethod[]> {
    console.log('Iniciando getPaymentMethods');
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log('Usuario autenticado, ID:', user.uid);
          return this.firestore.collection<PaymentMethod>(`users/${user.uid}/cards`).valueChanges({ idField: 'id' }).pipe(
            map(methods => {
              console.log('Métodos de pago obtenidos (longitud):', methods.length);
              console.log('Métodos de pago obtenidos (contenido):', JSON.stringify(methods));
              return methods;
            })
          );
        } else {
          console.log('No hay usuario autenticado en getPaymentMethods');
          return of([]);
        }
      })
    );
  }

  addPaymentMethod(paymentMethod: PaymentMethod): Observable<void> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (!user) throw new Error('No user authenticated');
        return this.firestore.collection(`users/${user.uid}/cards`).add(paymentMethod);
      }),
      map(() => undefined)
    );
  }

  updatePaymentMethod(paymentMethodId: string, data: Partial<PaymentMethod>): Observable<void> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (!user) throw new Error('No user authenticated');
        return this.firestore.doc(`users/${user.uid}/cards/${paymentMethodId}`).update(data);
      })
    );
  }

  deletePaymentMethod(paymentMethodId: string): Observable<void> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (!user) throw new Error('No user authenticated');
        return this.firestore.doc(`users/${user.uid}/cards/${paymentMethodId}`).delete();
      })
    );
  }

  getDrivers(): Observable<any[]> {
    return this.firestore.collection('drivers').valueChanges().pipe(
      map((drivers: any[]) => {
        // Tu lógica aquí
        return drivers;
      })
    );
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      // Limpiar cualquier dato de sesión almacenado localmente
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      // Asegurarse de que la navegación ocurra después de que se complete el cierre de sesión
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
      throw error;
    }
  }

  getTripHistory(): Observable<Trip[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection<Trip>(`users/${user.uid}/trips`, ref => ref.orderBy('date', 'desc'))
            .valueChanges({ idField: 'id' }).pipe(
              take(1),
              map(trips => {
                console.log('Historial de viajes obtenido:', trips);
                return trips;
              })
            );
        } else {
          return of([]);
        }
      })
    );
  }
}
