import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/core/services/member.service';
import { CreateUserDto, UserService } from 'src/app/core/services/user.service';
import { passwordMatch } from '../util';

@Component({
  selector: 'stapp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl= new FormControl(null, [Validators.required, Validators.minLength(6)]);

  registerFormGroup: FormGroup = this.formBuiler.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: this.passwordControl, //we assign it to a variable in order to be used in the match function of the confirmPassword formControl
    confirmPassword: new FormControl(null, [Validators.required, passwordMatch(this.passwordControl)])
  });
  
  constructor(
    private formBuiler: FormBuilder,
    private userService: UserService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  //we can use this method if we want to save ourselves the repeated condition in the .html *ngIf .touched && .valid
  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) { //source group is the registerFormGroup by default, but there is option to provide it in the cases when there is a separate group, like for the passwords, i.e. ('password', passwordsGroup)
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid
  }

  handleRegister():void{
    const {name, email, password} = this.registerFormGroup.value;

    const body: CreateUserDto = {
      name: name,
      email: email,
      password: password
    }

    this.userService.createProfile$(body).subscribe(() => {
      this.registerFormGroup.reset();
      this.router.navigate(['../', 'signin'], { relativeTo: this.activatedRoute})
    });
  }
}
