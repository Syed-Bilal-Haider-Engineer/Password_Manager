import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Password } from '../../../model/model.type';
import { PasswordService } from '../../../service/password.service';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EncryptionService } from '../../../service/encryption.service';
@Component({
  selector: 'app-password-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.scss',
})
export class PasswordUpdateComponent implements OnInit {
  private passwordService = inject(PasswordService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private encryptionAndDecryption = inject(EncryptionService);

  isToggleVisibility = signal(true);
  isReadonly = true;
  userId: string | null = null;
  password = '';
  email = '';
  appName = '';
  categoryName = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.userId = idParam;
        this.fetchPasswordDetails();
      }
    });
  }

  private fetchPasswordDetails(): void {
    this.passwordService
      .getPasswordById(this.userId)
      .pipe(
        catchError((err: any) => {
          console.error('Error fetching password details:', err);
          return throwError(() => err);
        })
      )
      .subscribe((password: Password) => {
        this.populateForm(password);
      });
  }

  private populateForm(password: Password): void {
    this.categoryName = password.categoryName || '';
    this.appName = password.appName || '';
    this.email = password.email || '';
    this.password =
      this.encryptionAndDecryption.decrypt(password.password) || '';
  }

  public togglePassword() {
    this.isToggleVisibility.update((value) => !value);
  }
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  onUpdate(): void {
    if (!this.password) {
      alert('Password is required!');
      return;
    } 

    const passwordUser: Password = {
      categoryName: this.categoryName,
      appName: this.appName,
      email: this.email,
      password: this.encryptionAndDecryption.encrypt(this.password)
    };

    this.passwordService
      .updatePassword(this.userId, passwordUser)
      .pipe(
        catchError((err: any) => {
          console.error('Error adding password:', err);
          alert('Error adding password');
          throw err;
        })
      )
      .subscribe((response) => {
        if (response) {
          alert('Password Update successfully');
          this.resetForm();
          this.navigateToHome();
        }
      });
  }
  private resetForm(): void {
    this.categoryName = '';
    this.appName = '';
    this.email = '';
    this.password = '';
  }

  public deletePassword(): void {
    if (this.userId) {
      this.passwordService.deletePassword(this.userId).subscribe((response) => {
        this.navigateToHome();
      });
    }
  }
}
