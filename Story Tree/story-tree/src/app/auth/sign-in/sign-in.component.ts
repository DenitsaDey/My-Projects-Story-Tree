import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { emailValidator } from '../util';

@Component({
  selector: 'stapp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  errorMessage: string = '';
  invalidLogin: boolean;

  signinFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, Validators.email]), // ,emailValidator] - when custom email validator is required, we use the one from util.js or simply use Validators.pattern(/.{6,}@gmail\.(bg|com)/)
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

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

    //DDEY: bellow by https://www.youtube.com/watch?v=NSQHiIAP7Z8
    this.userService.signin$(this.signinFormGroup.value).subscribe({
      next: response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.router.navigate(['../', 'home'], { relativeTo: this.activatedRoute });
        
    console.log(this.userService.currentUser);
      }, error: (err) => {
        this.errorMessage = err.error.message;
        this.invalidLogin = true;
      }
    });
    // DDEY: bellow by G.Stoimenov
    // this.userService.signin$(this.signinFormGroup.value).subscribe({
    //   next: user => {
    //     console.log(user);
    //     this.router.navigate(['/home']);
    //   },
    //   complete: () => {
    //     console.log('login stream completed')
    //   },
    //   error: (err) => {
    //     this.errorMessage = err.error.message;
    //   }
    // });
  }
}
