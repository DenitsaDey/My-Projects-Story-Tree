import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'stapp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm){
    console.log(loginForm.value);
  }

  loginHandler(): void{
    //toDo validate user's data
    this.userService.login();
    this.router.navigate(['/home']);
  }
}
