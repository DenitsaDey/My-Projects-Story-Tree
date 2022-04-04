import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private jwtHelper: JwtHelperService, 
    private router: Router){}
  
  canActivate():boolean | UrlTree{
    const token = localStorage.getItem('jwt');

    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    return this.router.createUrlTree(['/signin']);
  }
  
  
}
