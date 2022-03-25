import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/core/services/member.service';

@Component({
  selector: 'stapp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  
  constructor(private memberService: MemberService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.memberService.createProfile(this.registerForm.value)
    .subscribe(response => {
      console.log(response);
      this.registerForm.reset();
      this.router.navigate(['../', 'signin'], { relativeTo: this.activatedRoute});
    },
    (error) => {
      console.log(error);
    });
  }
}
