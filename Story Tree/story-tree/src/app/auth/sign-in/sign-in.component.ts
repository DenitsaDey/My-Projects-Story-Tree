import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { emailValidator } from '../util';

@Component({
  selector: 'stapp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  errorMessage: string = '';

  signinFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, Validators.email]), // ,emailValidator] - when custom email validator is required, we use the one from util.js or simply use Validators.pattern(/.{6,}@gmail\.(bg|com)/)
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(): void{
  }

  loginHandler(): void{
    //toDo validate user's data
    //this.userService.login();
    //this.router.navigate(['/home']);
    //console.log('form is submitted', this.signinFormGroup)
  }

  handleSignIn(): void{
    this.errorMessage = '';
    this.userService.signin$(this.signinFormGroup.value).subscribe({
      next: user => {
        console.log(user);
        this.router.navigate(['/home']);
      },
      complete: () => {
        console.log('login stream completed')
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
  }
}
