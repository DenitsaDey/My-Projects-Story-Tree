import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMember, IProfile } from '../interfaces'
import { environment } from 'src/environments/environment';

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

  
}
