import { Component, input, inject, signal, OnInit, effect } from '@angular/core';
import { PasswordService } from '../../../service/password.service';
import { catchError } from 'rxjs';
import { Password } from '../../../model/model.type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { PasswordCreateComponent } from '../password-create/password-create.component';
@Component({
  selector: 'app-password',
  standalone: true,
  imports: [RouterModule, CommonModule,HeaderComponent,PasswordCreateComponent],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent implements OnInit {
  isToggle = signal(false);
  passwordService = inject(PasswordService);
  passwordList = signal<Array<Password>>([]);
  visiblePasswords = signal<Set<number>>(new Set());

  constructor() {
    effect(() => {
      if (!this.isToggle()) {
        this.fetchPassword();
      }
    });
  }

  ngOnInit(): void {
      this.fetchPassword();
  }

  handleModal = () => {
    this.isToggle.update((value:any)=> !value);
  };



  private fetchPassword(): void {
    this.passwordService
      .getPasswords()
      .pipe(
        catchError((err: any) => {
          throw err;
        })
      )
      .subscribe((list) => {
        this.passwordList.set(list);
      });
  }

  public deletePassword(id: string | undefined): void {
    if (id) {
      this.passwordService.deletePassword(id).subscribe((response) => {
        this.fetchPassword();
      });
    }
  }

  public copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Copied to clipboard:', text);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  public togglePasswordVisibility(index: number): void {
    const currentVisible = this.visiblePasswords();
    const newVisible = new Set(currentVisible);
    
    if (newVisible.has(index)) {
      newVisible.delete(index);
    } else {
      newVisible.add(index);
    }
    
    this.visiblePasswords.set(newVisible);
  }

  public isPasswordVisible(index: number): boolean {
    return this.visiblePasswords().has(index);
  }
}
