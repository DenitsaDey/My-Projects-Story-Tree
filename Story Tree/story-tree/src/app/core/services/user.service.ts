import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogged = false;
  constructor(private storage: StorageService) {
    this.isLogged = this.storage.getItem('isLogged');
   }


   login():void{
     this.isLogged = true;
     this.storage.setItem('isLogged', true);
   }

   logout(): void{
    this.isLogged = true;
    this.storage.setItem('isLogged', true);
   }
}
