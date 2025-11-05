import { Routes } from '@angular/router';
import { PasswordUpdateComponent } from './components/passwords/password-update/password-update.component';
import { PasswordComponent } from './components/passwords/password-list/password.component';

export const routes: Routes = [
    {path:'home', component: PasswordComponent, pathMatch:'full'},
    {path: 'password-update/:id', component: PasswordUpdateComponent,pathMatch: 'full'},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '*', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];
