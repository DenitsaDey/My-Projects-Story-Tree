import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMember, IUser } from '../interfaces/index';
import { StorageService } from './storage.service';

export interface CreateUserDto { name: string, email: string, password: string }

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

  currentUser: IUser;
  isLogged = false;

  constructor(private storage: StorageService, private httpClient: HttpClient) {
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


  //DDEY TODO
  createProfile$(userData: CreateUserDto){
    return this.httpClient.post(`${apiUrl}/profiles`, userData, {withCredentials: true});
  };

  getUserById$(id: string): Observable<IMember>{
    return this.httpClient.get<IMember>(`${apiUrl}/profiles/${id}`);
  }
}
