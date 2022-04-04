import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember, IUser } from '../interfaces/index';
import { StorageService } from './storage.service';

export interface CreateUserDto { name: string, email: string, password: string }
//DDEY: this is the same as an object with string key and its value: { [key: string]: string }

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

  currentUser: IUser;
  //isLogged = false; initial version
  get isLogged(){
    return !!this.currentUser;
  }

  constructor(private storage: StorageService, 
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService) {
    //this.isLogged = this.storage.getItem('isLogged'); initial version
    console.log('UserService#constructor');
  }

  isUserAuthenticated(){
    const token: string = localStorage.getItem('jwt');
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    else{
      return false;
    }
  }
  signin$(userData: { email: string, password: string }): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${apiUrl}/auth/signin`, userData )
      .pipe(
        tap(response => console.log(response)),
        // map(response => this.currentUser = response),
        // tap(user => console.log(this.currentUser)),
        // tap(user => console.log(user))
        tap(user => this.currentUser = user)
      ); 
      //DDEY: this bellow currently blocks the CORS
      //.post<IUser>(`${apiUrl}/auth/signin`, userData, { withCredentials: true, observe: 'response' } 
      // .pipe(
      //   tap(response => console.log(response)),
      //   map(response => response.body),
      //   tap(user => this.currentUser = user)
      // );
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
   //DDEY: from https://www.youtube.com/watch?v=NSQHiIAP7Z8
   localStorage.removeItem("jwt");
  }


  //DDEY TODO - registering a new profile
  createProfile$(userData: CreateUserDto){
    return this.httpClient.post(`${apiUrl}/auth/register`, userData,); // HttpRequest with property {withCredentials: true} -> sets the cookies from the backend
  };

  getUserById$(id: string): Observable<IMember>{
    return this.httpClient.get<IMember>(`${apiUrl}/profiles/${id}`);
  }

  
  
}
