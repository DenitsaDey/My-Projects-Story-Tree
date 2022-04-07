import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProfile, IUser } from '../interfaces/index';

export interface CreateUserDto { name: string, email: string, password: string }
//DDEY: this is the same as an object with string key and its value: { [key: string]: string }

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {


  constructor(private httpClient: HttpClient) {
  }

  //DDEY: used in the profile component
  getUserById$(id: string): Observable<IProfile>{
    return this.httpClient.get<IProfile>(`${apiUrl}/profiles/${id}`, { withCredentials: true});
    // .pipe
    // (tap(request => console.log('request is:')),
    // tap(request => console.log(request)));
  }
  
}
