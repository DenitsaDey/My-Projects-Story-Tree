import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IFullUser, IProfile, IUser } from '../interfaces/index';

export interface IUpdateUserDto extends Pick<IFullUser, 'name' | 'location' > {
  partner?: IUser;
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
  }
  

  updateProfile$(newUser: IUpdateUserDto): Observable<IFullUser>{
    const formData = new FormData();
    formData.set('name', newUser.name);
    formData.set('location', newUser.location);
    formData.set('partner', newUser.partner.name);

    if (newUser.profilePicture){
      formData.append('profilePicture', newUser.profilePicture);
    }

    return this.httpClient.put<IFullUser>(`${apiUrl}/profiles/user`, formData, { withCredentials: true })
  }
}
