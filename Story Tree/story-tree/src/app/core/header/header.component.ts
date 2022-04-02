import { Component } from '@angular/core';
import { IUser } from '../interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'stapp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get currentUser(): IUser {
    return this.userService.currentUser;
  }
  constructor(public userService: UserService) { }

  logoutHandler(): void{
    this.userService.logout();
  }

}
