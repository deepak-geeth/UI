import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from '../../../store/user/user.model';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  standalone:true,
  imports:[IonHeader,IonTitle,IonToolbar,IonButton,IonButtons,IonContent,IonList,IonItem,IonLabel,IonInput,IonFooter,FormsModule]
})
export class UserPopupComponent {
  @Input() user: User | null = null; // Input property to receive a user when editing
  formData: User = { id: 0, name: '', email: '' }; // Initialize formData

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    // If a user is passed, populate the formData for editing
    if (this.user) {
      this.formData = { ...this.user };
    }
  }

  // Close the modal without saving
  close(): void {
    this.modalController.dismiss(null, 'cancel');
  }

  // Save the user data and close the modal
  save(): void {
    this.modalController.dismiss(this.formData, 'save');
  }
}
