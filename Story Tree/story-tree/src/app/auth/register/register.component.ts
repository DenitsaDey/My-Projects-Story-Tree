import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/core/services/member.service';
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
    confirmPassword: new FormControl(null, [passwordMatch(this.passwordControl)])
  });
  
  constructor(
    private formBuiler: FormBuilder,
    private memberService: MemberService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.memberService.createProfile(this.registerFormGroup.value)
    .subscribe(response => {
      console.log(response);
      this.registerFormGroup.reset();
      this.router.navigate(['../', 'signin'], { relativeTo: this.activatedRoute});
    },
    (error) => {
      console.log(error);
    });
  }

  handleRegister():void{
    console.log('registered');
  }
}
