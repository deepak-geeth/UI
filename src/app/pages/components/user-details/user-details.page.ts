import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserPopupComponent } from '../../../components/user-popup/user-popup.component';
import { User } from '../../../store/user/user.model';
import * as UserActions from '../../../store/user/user.actions';
import * as UserSelectors from '../../../store/user/user.selectors';
import { IonTitle,IonHeader,IonToolbar, IonContent, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-details',
  standalone: true,
  templateUrl: './user-details.page.html',
  imports:[IonHeader,IonTitle,IonToolbar,IonContent,IonButton,IonList,IonItem,IonLabel,CommonModule,IonicModule]
})
export class UserDetailsPage {
  users$: Observable<User[]> = this.store.pipe(select(UserSelectors.selectUsers));

  constructor(private store: Store, private modalCtrl: ModalController) {}

  ionViewWillEnter() {
    this.store.dispatch(UserActions.loadUsers());
  }

  async openPopup(user?: User) {
    const modal = await this.modalCtrl.create({
      component: UserPopupComponent,
      componentProps: { user },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      if (user) {
        this.store.dispatch(UserActions.editUser({ user: data }));
      } else {
        this.store.dispatch(UserActions.addUser({ user: data }));
      }
    }
  }

  deleteUser(userId: number) {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }
}
