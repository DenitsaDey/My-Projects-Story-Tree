import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";
import { SignInComponent } from "./sign-in/sign-in.component";

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    { 
        path: 'signin', 
        component: SignInComponent 
    },
    { 
        path: 'profile', 
        canActivate: [AuthGuard],
        component: ProfileComponent 
    }
]

export const AuthRoutingModule = RouterModule.forChild(routes);