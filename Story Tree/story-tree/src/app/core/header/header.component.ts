import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IFullUser, IUser } from '../interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'stapp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  currentUser$: Observable<IFullUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  private isLoggingOut: boolean = false;
  
  constructor(public userService: UserService, 
    public authService: AuthService,
    private router: Router) { 
  }

  logoutHandler(): void{
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;
    console.log('logout called');

    this.authService.handleLogout();
    this.isLoggingOut = false;
    this.router.navigate(['/home']);
  }

}
