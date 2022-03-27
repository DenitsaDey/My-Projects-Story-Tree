import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfile } from '../interfaces'
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpCLient: HttpClient) { }

  //we annotate the function with $ as this is the way to say this function returns an observable
  getProfiles$(): Observable<IProfile[]>{
    return this.httpCLient.get<IProfile[]>(`${apiUrl}/profiles.json`);
  }

  getProfileById$(id: string): Observable<IProfile>{
    return this.httpCLient.get<IProfile>(`${apiUrl}/profiles.json/${id}`);
  }

  
}
