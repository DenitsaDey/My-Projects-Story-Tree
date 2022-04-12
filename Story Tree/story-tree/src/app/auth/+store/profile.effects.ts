import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createEffects } from "@ngrx/effects/src/effects_module";
import { of } from "rxjs";
import { catchError, filter, map, mergeMap } from "rxjs/operators";
import { UserService } from "src/app/core/services/user.service";

import { profileLoaded, profileLoadError, profilePageInitalized } from "./actions";

@Injectable()
export class ProfileEffects {
    constructor(private actions$: Actions, private userService: UserService) { }

    onProfilePageLoaded$ = createEffect(() => //DDEY: we create an Effect 
        this.actions$.pipe( //DDEY: that will observe is actions are dispatched
            filter(a => a.type === profilePageInitalized().type),//DDEY: when the action matches our filter
            mergeMap(() => this.userService.getUser$()),//DDEY: then make a request to the server to get the profile
            map(currentProfile => profileLoaded({ profile: currentProfile })),//DDEY: and when the request is completed emit profileLoaded with the current profile value
            catchError(() => of(profileLoadError()))
        )
    )
}