import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMember, IUser } from '../interfaces/index';
import { StorageService } from './storage.service';

export interface CreateUserDto { name: string, email: string, password: string }

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

  currentUser: IUser;
  //isLogged = false; initial version
  get isLogged(){
    return !!this.currentUser;
  }

  constructor(private storage: StorageService, private httpClient: HttpClient) {
    //this.isLogged = this.storage.getItem('isLogged'); initial version
    console.log('UserService#constructor');
  }

  signin$(userData: { email: string, password: string }): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${apiUrl}/signin`, userData, { withCredentials: true, observe: 'response' })
      .pipe(
        tap(response => console.log(response)),
        map(response => response.body),
        tap(user => this.currentUser = user)
      )
  }

  /* old version
  login(): void {
    this.isLogged = true;
    this.storage.setItem('isLogged', true);
  }
  */

  logout(): void {
    /* old version
    this.isLogged = false;
    this.storage.setItem('isLogged', false);
    */
  }


  //DDEY TODO - registering a new profile
  createProfile$(userData: CreateUserDto){
    return this.httpClient.post(`${apiUrl}/profiles`, userData, {withCredentials: true}); // HttpRequest with property withCredentials: true -> sets the cookies from the backend
  };

  getUserById$(id: string): Observable<IMember>{
    return this.httpClient.get<IMember>(`${apiUrl}/profiles/${id}`);
  }

  register$(userData: CreateUserDto): Observable<IUser> {
    return this.httpClient.post<IUser>(`${apiUrl}/register`, userData, { withCredentials: true })
  }
}
