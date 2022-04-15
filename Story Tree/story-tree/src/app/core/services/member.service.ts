import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMember, IMemberDetails, IProfile } from '../interfaces'
import { environment } from 'src/environments/environment';
import { IBase } from '../interfaces/base';

export interface CreateRelativeDto { name: string, relationToMe: string, partnerId?: string, parent1Id?: string, parent2Id?: string }
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

   //DDEY: used in the member-details component
  getMemberById$(relativeId:string): Observable<IMemberDetails>{
    return this.httpClient.get<IMemberDetails>(`${apiUrl}/familymembers/${relativeId}`);
  }

  //DDEY: used in the add-member component for the drop-down select box
  getAllMembers$(): Observable<IBase[]>{
    return this.httpClient.get<IBase[]>(`${apiUrl}/familymembers`)
  }
 

  addRelative$(relative: CreateRelativeDto){
    
    return this.httpClient.post(`${apiUrl}/familymembers/add`, relative);
  }

  
}
