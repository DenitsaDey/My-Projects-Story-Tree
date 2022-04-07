import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, EMPTY, Observable} from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from './core/interfaces';
import { CreateUserDto } from './core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //DDEY: BehaviorSubject will emit instantly a subject to our listener with the current value of the subject
  //by g.stoimenov: private _currentUser = new BehaviorSubject<IUser>(undefined);
  private _currentUser = new BehaviorSubject<IUser>(undefined);

  //DDEY: by calling handleLogin() we protect the currentUser$ from being set externally from someone else and at the same time 'next' will provide all subscribers of the User currently logged
  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  /* //DDEY: one way to keep the state even after Reloading the page is by using the token set in the local storage
     //by https://www.youtube.com/watch?v=7G7qzlblJcI
  private _isLoggedIn$ =new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private httpClient: HttpClient, 
    private jwtHelper: JwtHelperService) {
      this._isLoggedIn$.next(isUserAuthenticated()); 
  }
  
  */

  constructor(private httpClient: HttpClient, 
    private jwtHelper: JwtHelperService) {
  }


//DDEY: used in the register component
register$(userData: CreateUserDto): Observable<IUser>{
  return this.httpClient.post<IUser>(`${environment.apiUrl}/auth/register`, userData,{withCredentials: true}); // HttpRequest with property {withCredentials: true} -> sets the cookies from the backend
};

  //DDEY: used in the signin component
  signin$(userData: { email: string, password: string }): Observable<IUser> {
    return this.httpClient
    .post<IUser>(`${environment.apiUrl}/auth/signin`, userData, { withCredentials: true}) 
    .pipe(
      //map(response => (<any>response.body).user), //-> doesn't map
      //tap(response => console.log("response from auth service map")),
      //tap(response => console.log(response)),
    );
}
/*
signin$(userData: { email: string, password: string }): Observable<IUser> {
    return this.httpClient
    .post<IUser>(`${environment.apiUrl}/auth/signin`, userData, { withCredentials: true, observe: 'response' }) 
    .pipe(
      map(response => response.body)
    );
}
*/
  
//DDEY: used in the header component for logoutHandler and in the auth interceptor
handleLogout(): void {
  //DDEY: from https://www.youtube.com/watch?v=NSQHiIAP7Z8
  localStorage.removeItem("jwt");
  //DDEY: by g.stoimenov
  this._currentUser.next(undefined);
 }

  /* by g.stoimenov
  logout$(): Observable<void> {
    return this.httpClient
      .post<void>(`${environment.apiUrl}/logout`, {}, { withCredentials: true })
  }
  */

  //DDEY: authenticate with jwt
  isUserAuthenticated(){
    const token: string = localStorage.getItem('jwt');
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    else{
      return false;
    }
  }

  //by g.stoimenov
  authenticate(): Observable<IUser> {
    return this.httpClient
      .get<IUser>(`${environment.apiUrl}/profiles`, { withCredentials: true })
      .pipe(tap(currentProfile => this.handleLogin(currentProfile)), catchError((err) => {
        return EMPTY;
      }))
  }

  handleLogin(newUser: IUser) {
    this._currentUser.next(newUser);
  }

}
