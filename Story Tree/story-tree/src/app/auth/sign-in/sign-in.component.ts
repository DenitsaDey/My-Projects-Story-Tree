import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';

@Component({
  selector: 'stapp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm){
    console.log(loginForm.value);
  }
}
