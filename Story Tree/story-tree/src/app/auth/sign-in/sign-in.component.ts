import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { emailValidator } from '../util';

@Component({
  selector: 'stapp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  currentUser$: Observable<IUser> = this.authService.currentUser$;

  errorMessage: string = '';
  invalidLogin: boolean;

  signinFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, Validators.email]), // ,emailValidator] - when custom email validator is required, we use the one from util.js or simply use Validators.pattern(/.{6,}@gmail\.(bg|com)/)
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
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
    this.errorMessage = '';
    
    this.authService.signin$(this.signinFormGroup.value)
      .subscribe({
         //(response) => {
        next: response => {
              console.log(response);
              const token = (<any>response).token;
              localStorage.setItem("jwt", token);
              this.currentUser$ = (<any>response).user;
              //this.currUser = (<any>response).user;
              this.invalidLogin = false;
              this.router.navigate(['../', 'home'], { relativeTo: this.activatedRoute });
          console.log(token);
          //console.log(this.currUser)
          console.log(this.currentUser$);
          //console.log(this.authService.isLoggedIn$? 'true' : 'false') -  checking if isLoggedIn$ works
            }, error: (err) => {
              this.errorMessage = err.error.message; // DDEY: gives undefined?
              this.invalidLogin = true;
            }
          });
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
