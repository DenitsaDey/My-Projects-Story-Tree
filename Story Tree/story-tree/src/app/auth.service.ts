import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, EMPTY, Observable} from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IRootState, logout, signin } from './+store';
import { IFullUser } from './core/interfaces';
import { CreateUserDto } from './core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //DDEY: BehaviorSubject will emit instantly a subject to our listener with the current value of the subject
  //by g.stoimenov:
  private _currentUser = new BehaviorSubject<IFullUser>(undefined);
  //by profanis https://www.youtube.com/watch?v=ErToLPJHHLE
  private _hasToken$ = new BehaviorSubject<boolean>(false);
  //by DDEY
  private _currentUserId = new BehaviorSubject<string>(undefined);

  //DDEY: by calling handleLogin() we protect the currentUser$ from being set externally from someone else and at the same time 'next' will provide all subscribers of the User currently logged
  //old version before store: currentUser$ = this._currentUser.asObservable();
  currentUser$ = this.store.select(globalState => globalState.currentUser);
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));
  currentUserId$ = this._currentUserId.asObservable();

  //by profanis
  private readonly tokenName = 'jwt';
  hasToken$ = this._hasToken$.asObservable();

  get token() {
    return localStorage.getItem(this.tokenName);
  }


  private currUserId: string;

  get userId(){
    this.currentUserId$.subscribe((userId) => {
      this.currUserId = userId;
    });
    return this.currUserId;
  }

  
  /* //DDEY: one way to keep the state even after Reloading the page is by using the token set in the local storage
     //by https://www.youtube.com/watch?v=7G7qzlblJcI
  private _isLoggedIn$ =new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private httpClient: HttpClient, 
    private jwtHelper: JwtHelperService) {
      const token = localStorage.getItem('jwt')
      this._isLoggedIn$.next(this.isUserAuthenticated(token)); 
  }
  
  */

  constructor(private httpClient: HttpClient, 
    private jwtHelper: JwtHelperService,
    private store: Store<IRootState>) {
      this._hasToken$.next(!!this.token);
  }

  


//DDEY: used in the register component
register$(userData: CreateUserDto): Observable<IFullUser>{
  return this.httpClient.post<IFullUser>(`${environment.apiUrl}/auth/register`, userData,{withCredentials: true}); // HttpRequest with property {withCredentials: true} -> sets the cookies from the backend
};

  //DDEY: used in the signin component
  signin$(userData: { email: string, password: string }): Observable<IFullUser> {
    return this.httpClient
    .post<IFullUser>(`${environment.apiUrl}/auth/signin`, userData, { withCredentials: true}) //, observe: 'response'
    .pipe(
      tap((response: any) =>{
        const token = (<any>response).token;
        //this._hasToken$.next(true);
        localStorage.setItem(this.tokenName, token);
        this.currentUser$ = (<any>response).user;
        //this.currentUserId$.subscribe((userId) => {
           //this.Id = userId;
           // });
        this._currentUserId.next((<any>response).user.id);
        console.log(token);
        console.log(this.currentUser$);
        console.log(this._currentUserId.value);   
      })
      //map(response => (<any>response.body).user), //-> doesn't map if the user is set in the signin component
      //tap(response => console.log("response from auth service map")),
      //tap(response => console.log(response)),
    );
}

  //DDEY: authenticate with jwt
  isUserAuthenticated(){
    const token = localStorage.getItem(this.tokenName);
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    else{
      return false;
    }
  }

  //by g.stoimenov - used in the app module for preserving the user credentials on reloading the page
  authenticate(): Observable<IFullUser> {
    return this.httpClient
      .get<IFullUser>(`${environment.apiUrl}/profiles/user`, { withCredentials: true })
      .pipe(tap(currentProfile => this.handleLogin(currentProfile)), catchError((err) => {
        return EMPTY;
      }))
  }
  

  //DDEY: used in the interceptor
  handleLogin(newUser: IFullUser) {
    this.store.dispatch(signin({ user: newUser }));
  }

  //DDEY: used in the header component for logoutHandler and in the auth interceptor
handleLogout(): void {
  //DDEY: from https://www.youtube.com/watch?v=NSQHiIAP7Z8
  localStorage.removeItem(this.tokenName);
  //DDEY: by g.stoimenov
  this.store.dispatch(logout())
  this._currentUserId.next(undefined);
 }

  /* by g.stoimenov
  logout$(): Observable<void> {
    return this.httpClient
      .post<void>(`${environment.apiUrl}/logout`, {}, { withCredentials: true })
  }
  */

}
