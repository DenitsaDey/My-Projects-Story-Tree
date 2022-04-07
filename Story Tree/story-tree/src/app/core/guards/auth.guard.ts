import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private jwtHelper: JwtHelperService, 
    private authService: AuthService,
    private router: Router){}
  
  
  //DDEY: by https://www.youtube.com/watch?v=NSQHiIAP7Z8
    canActivate():boolean | UrlTree{
    const token = localStorage.getItem('jwt');

    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    return this.router.createUrlTree(['/signin']);
  }
  
  //DDEY: by g.stoimenov
  canActivate2(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    console.log(route, state);
    return this.authService.isLoggedIn$.pipe(take(1), map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      }

      return this.router.createUrlTree(['/signin'], {
        queryParams: {
          'redirect-to': '/' + route.url.map(f => f.path).join('/')
        }
      });
    }))
  }
  
}
