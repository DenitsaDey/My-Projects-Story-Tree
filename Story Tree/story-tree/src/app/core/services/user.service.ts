import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IFullUser, IProfile, IUser } from '../interfaces/index';

/* DDEY: the bellow Pick is an Utility type thas specifies 
"Pick only the following properties from IFullUser interface" 
and extend it with additional partnerName and Profile picture

 export interface IUpdateUserDto extends Pick<IFullUser, 'name' | 'location' > {
   partnerName?: string;
   profilePicture?: File;
 }
*/
export interface IUpdateUserDto {name: string, location: string, partnerName?: string, profilePicture?: File; newGalleryPicture?: File;}
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
  

  updateProfile$(newUser: IUpdateUserDto): Observable<IProfile>{
    const formData = new FormData();
    formData.set('name', newUser.name);
    formData.set('location', newUser.location);
    formData.set('partnerName', newUser.partnerName);

    if (newUser.profilePicture){
      formData.append('profilePicture', newUser.profilePicture);
    }

    if(newUser.newGalleryPicture){
      formData.append('newGalleryPicture', newUser.newGalleryPicture);
    }


    return this.httpClient.put<IProfile>(`${apiUrl}/profiles/user`, formData, { withCredentials: true })
  }
}
