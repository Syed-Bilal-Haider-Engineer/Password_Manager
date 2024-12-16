import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { PasswordService } from '../../../service/password.service';
import { Password } from '../../../model/model.type';
import { EncryptionService } from '../../../service/encryption.service';

@Component({
  selector: 'app-password-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './password-create.component.html',
  styleUrls: ['./password-create.component.scss'],
})
export class PasswordCreateComponent {
  @Output() toggleModal = new EventEmitter<void>();
  private passwordService = inject(PasswordService);
  private encryptionAndDecryption = inject(EncryptionService);
  password = '';
  email = '';
  appName = '';
  categoryName = '';

  onAddButtonClick(): void {
    this.toggleModal.emit();
  }

  onSubmit(): void {

    if (!this.categoryName || !this.appName || !this.email || !this.password) {
      alert('All fields are required!');
      return; 
    }

    var re = /\S+@\S+\.\S+/;
    if (! re.test(this.email.trim())) {
      alert("Email format is invalid!")
      return;
    }

    const encryptPassword = this.encryptionAndDecryption.encrypt(this.password);
    const passwordUser: Password = {
      categoryName: this.categoryName,
      appName: this.appName,
      email: this.email,
      password: encryptPassword,
    };

    this.passwordService
      .addPassword(passwordUser)
      .pipe(
        catchError((err: any) => {
          console.error('Error adding password:', err);
          alert("Error adding password");
          throw err; 
        })
      )
      .subscribe((response) => {
        if (response) {
          alert("Password added successfully");
          this.resetForm(); 
          this.onAddButtonClick()
        }
      });
  }

  private resetForm(): void {
    this.categoryName = '';
    this.appName = '';
    this.email = '';
    this.password = '';
  }
}
