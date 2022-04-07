//the interceptor has to be also declared in the module that is part of, i.e core.module in this case
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IUser } from './interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  //DDEY: the idea is on login to get the user from the HttpResponse and store it
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(tap(event =>{
      if(event instanceof HttpResponse) {
        if(event.url.endsWith('signin')){ //DDEY: include { || event.url.endsWith('register') } if the user access the site straight after register. In my case I redirect to login and from there the user accesses the rest of the app
          console.log('login/register happened');
          const newlyLoggedUser: IUser = (<any>event.body).user; //DDEY - because the response from ASP.NET sends an Object{token:..., user{id:..., name:..., email:...}} and we need to take only the user out of it
          this.authService.handleLogin(newlyLoggedUser);
        } else if (event.url.endsWith('logout')) {
          this.authService.handleLogout();
        }
      }
    }));
  }
}
