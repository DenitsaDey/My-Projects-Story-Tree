import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { IAuthState, profileReducer, loginReducer } from './+store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './+store/profile.effects';


@NgModule({
  declarations: [
    RegisterComponent,
    SignInComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature<IAuthState>('auth', {
      profile: profileReducer,
      login: loginReducer,
    }),
    EffectsModule.forFeature([ProfileEffects])
  ]
})
export class AuthModule {  
}
