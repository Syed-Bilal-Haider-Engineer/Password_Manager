import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {Password} from '../model/model.type';
import { apiUrl } from '../../utils/constant';
@Injectable({
  providedIn: 'root',
})
export class PasswordService {  
  http = inject(HttpClient);

  public getPasswords() {
    return this.http.get<Password[]>(apiUrl);
  }
  public getPasswordById(id: string | null) {
    return this.http.get<Password>(`${apiUrl}/${id}`);
  }

  public addPassword(password: Password) {
    return this.http.post<Password>(apiUrl, password);
  }

  public updatePassword(id: string | null, password: Password) {
    return this.http.put<Password>(`${apiUrl}/${id}`, password);
  }

  public deletePassword(id: string | null) {
    return this.http.delete(`${apiUrl}/${id}`);
  }
}
