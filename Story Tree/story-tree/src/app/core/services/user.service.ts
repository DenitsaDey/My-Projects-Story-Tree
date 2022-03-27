import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})


export class UserService {

  isLogged = false;

  constructor(private storage: StorageService, private httpCLient: HttpClient) {
    this.isLogged = this.storage.getItem('isLogged');
  }


  login(): void {
    this.isLogged = true;
    this.storage.setItem('isLogged', true);
  }

  logout(): void {
    this.isLogged = false;
    this.storage.setItem('isLogged', false);
  }

  createProfile$(profile){
    return this.httpCLient.post(`${apiUrl}/profiles.json`, profile);
  };
}
