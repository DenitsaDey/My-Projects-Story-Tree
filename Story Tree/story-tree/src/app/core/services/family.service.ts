import { Injectable } from '@angular/core';
import * as go from 'gojs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {IMember} from '../interfaces'
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable()
export class FamilyService {
  

  constructor(private httpClient: HttpClient) {}
   
  //DDEY: used in family tree page component
  //DDEY: TODO find how to get the profileId from the jwt ? {withCredentials: true}
   loadFamilyTree$(): Observable<IMember[]>{
    return this.httpClient.get<IMember[]>(`${apiUrl}/familymembers`, { withCredentials: true})
    .pipe(map((familyMembers: []) => {
      return familyMembers
      // .map(familyMember => ({
      //   id: familyMember.id,
      //   name: familyMember.name,
      //   relationToMe: familyMember.relationToMe,
      //   parent1Id: familyMember.parent1Id
      // }))
    })
    );
   }
  
}
