import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IFullUser, IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { IAuthModuleState } from '../+store';
import { initializeLoginState, loginProcessError, startLoginProcess } from '../+store/actions';
import { loginErrorMessageSelector, loginIsLoginPendingSelector } from '../+store/selectors';
import { emailValidator } from '../util';

const myRequired = (control: AbstractControl) => {
  // console.log('validator called');
  return Validators.required(control);
}

@Component({
  selector: 'stapp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  currentUser$: Observable<IFullUser> = this.authService.currentUser$;

  //old version
  //errorMessage: string = '';
  //invalidLogin: boolean;

  errorMessage$: Observable<string> = this.store.select(loginErrorMessageSelector); // DDEY:(s => s.auth.login.errorMessage) 
  isLoginPending$: Observable<boolean> = this.store.select(loginIsLoginPendingSelector); // DDEY: (s => s.auth.login.isLoginPending)


  signinFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, Validators.email]), // ,emailValidator] - when custom email validator is required, we use the one from util.js or simply use Validators.pattern(/.{6,}@gmail\.(bg|com)/)
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<IAuthModuleState>) { }

  ngOnInit(): void {
    // this.store.dispatch(initializeLoginState()); //DDEY: this could be called here or in the onDestroy()
    // this.loginFormGroup.get('email').valueChanges.subscribe(value => {
    //   console.log('email changed', value);
    // })
  }

  ngOnDestroy(): void {
    this.store.dispatch(initializeLoginState());
  }
  
  onLogin(): void {
  }

  loginHandler(): void {
    //toDo validate user's data
    //this.userService.login();
    //this.router.navigate(['/home']);
    //console.log('form is submitted', this.signinFormGroup)
  }

  handleSignIn(): void {
    //old version: this.errorMessage = '';
    this.store.dispatch(startLoginProcess());

    this.authService.signin$(this.signinFormGroup.value)
       .subscribe({
         next: () => {
          this.router.navigate(['../', 'home'], { relativeTo: this.activatedRoute });
         },
         complete: () => {
           console.log('signin stream completed')
         },
         error: (err: any) => {
           this.store.dispatch(loginProcessError({ errorMessage: "Invalid username or password" }));
         }
        });
    //DDEY: version before testing handling sign in in auth service
    // this.authService.signin$(this.signinFormGroup.value)
    //   .subscribe({
    //     next: response => {
    //       console.log(response);
    //       const token = (<any>response).token;
    //       localStorage.setItem("jwt", token);
    //       this.currentUser$ = (<any>response).user;
    //       this.invalidLogin = false;
    //       this.router.navigate(['../', 'home'], { relativeTo: this.activatedRoute });
    //       console.log(token);
    //       console.log(this.currentUser$);
    //       //console.log(this.authService.isLoggedIn$? 'true' : 'false') -  checking if isLoggedIn$ works
    //     }, error: (err) => {
    //       this.errorMessage = err.error.message; // DDEY: gives undefined?
    //       this.invalidLogin = true;
    //     }
    //   });
  }

}
    //DDEY: bellow by https://www.youtube.com/watch?v=NSQHiIAP7Z8
    // DDEY: bellow old version from userService
    //  this.userService.signin$(this.signinFormGroup.value).subscribe({
    //   next: response => {
    //     const token = (<any>response).token;
    //     localStorage.setItem("jwt", token);
    //     this.userService.currentUser = (<any>response).user;
    //     this.invalidLogin = false;
    //     this.router.navigate(['../', 'home'], { relativeTo: this.activatedRoute });

    // console.log(this.userService.currentUser);
    //   }, error: (err) => {
    //     this.errorMessage = err.error.message; // DDEY: gives undefined?
    //     this.invalidLogin = true;
    //   }
    // });
