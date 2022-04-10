import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IFullUser } from '../interfaces/index';

export interface IUpdateUserDto extends Pick<IFullUser, 'name' | 'email' | 'location' | 'partner'> {
  profilePicture?: File;
}

export interface CreateUserDto { name: string, email: string, password: string }
//DDEY: this is the same as an object with string key and its value: { [key: string]: string }

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

  userId: string;

  constructor(private httpClient: HttpClient) {
  }

  //DDEY: used in the profile component
  getUser$(): Observable<IFullUser>{
    return this.httpClient
    .get<IFullUser>(`${apiUrl}/profiles/user`, { withCredentials: true })
    
    //return this.httpClient.get<IProfile>(`${apiUrl}/profiles/${id}`, { withCredentials: true});
    // .pipe
    // (tap(request => console.log('request is:')),
    // tap(request => console.log(request)));
  }
  
  /*DDEY: testing getting user info through http request
  getUser$(): Observable<IProfile>{
    return this.httpClient.get<IProfile>(`${apiUrl}/profiles/user`, { withCredentials: true})
    .pipe(
      (tap(request => console.log('request is:'))),
    (tap(request => console.log(request))));
    
  }
  */

  updateProfile$(newUser: IUpdateUserDto): Observable<IFullUser> {
    const formData = new FormData();
    formData.set('name', newUser.name);
    formData.set('email', newUser.location);
    formData.set('location', newUser.location);
    formData.set('partner', newUser.partner.name);

    if (newUser.profilePicture){
      formData.append('profilePicture', newUser.profilePicture);
    }

    return this.httpClient.put<IFullUser>(`${environment.apiUrl}/users/profile`, formData, { withCredentials: true })
  }
}
