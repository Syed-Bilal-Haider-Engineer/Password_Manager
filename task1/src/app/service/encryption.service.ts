import { Injectable } from '@angular/core';
import { key } from '../../utils/constant';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  public encrypt(password: string): string {
      return CryptoJS.AES.encrypt(password,key).toString();
  }

  public decrypt(passwordToDecrypt: string) {
      return CryptoJS.AES.decrypt(passwordToDecrypt, key).toString(CryptoJS.enc.Utf8);
  }
}
