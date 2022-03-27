import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/index';
import { StorageService } from './storage.service';

export interface CreateUserDto { name: string, email: string, password: string }

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})


export class UserService {

  currentUser: IUser;
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

  createProfile$(userData: CreateUserDto): Observable<IUser>{
    return this.httpCLient.post(`${apiUrl}/profiles.json`, userData, {withCredentials: true});
  };
}
