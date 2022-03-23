import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    RegisterComponent,
    SignInComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
