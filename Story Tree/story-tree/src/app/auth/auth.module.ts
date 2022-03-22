import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    RegisterComponent,
    SignInComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
