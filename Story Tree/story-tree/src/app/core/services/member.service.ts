import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMember, IProfile } from '../interfaces'
import { environment } from 'src/environments/environment';
import { IBase } from '../interfaces/base';

export interface CreateMemberDto { name: string, relationToMe: string, partnerId?: string, parent1Id?: string, parent2Id?: string }
//DDEY: this is the same as an object with string key and its value: { [key: string]: string }

const apiUrl = environment.apiUrl;

@Injectable()
export class MemberService {

  constructor(private httpClient: HttpClient) { }

  //DDEY: we annotate the function with $ as this is the way to say this function returns an observable
  
  /* DDEY: query example by Ilia Idakiev
    getProfiles$(limit?:number): Observable<IProfile[]>{
     return this.httpClient.get<IProfile[]>(`${apiUrl}/profiles${limit ? `?{limit}` : ''}`);
   }
  */

  getMemberById$(profileId: string, relativeId:string): Observable<IMember>{
    return this.httpClient.get<IMember>(`${apiUrl}/familymembers/${profileId}/${relativeId}`);
  }

  //DDEY: TODO find how to get the profileId from the jwt
  getAllMembers$(profileId: string): Observable<IBase[]>{
    return this.httpClient.get<IBase[]>(`${apiUrl}/familymembers/${profileId}`)
  }

  createMember$(member: CreateMemberDto){
    //DDEY: TODO logic if member already exists or to create new
    return this.httpClient.post(`${apiUrl}/`)
  }

  // createProfile$(userData: CreateUserDto){
  //   return this.httpClient.post(`${apiUrl}/auth/register`, userData,); // HttpRequest with property {withCredentials: true} -> sets the cookies from the backend
  // };
}
