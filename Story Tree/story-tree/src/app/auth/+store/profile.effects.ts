import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createEffects } from "@ngrx/effects/src/effects_module";
import { of } from "rxjs";
import { catchError, filter, map, mergeMap } from "rxjs/operators";
import { login } from "src/app/+store";
import { UserService } from "src/app/core/services/user.service";

import { profileLoaded, profileLoadError, profilePageInitalized, updateProfileCompleted, updateProfileError, updateProfileStarted } from "./actions";

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

    onProfileUpdateStarted$ = createEffect(() => this.actions$.pipe(
        ofType(updateProfileStarted),
        mergeMap(action => this.userService.updateProfile$(action.user)
            .pipe(
                map(result => updateProfileCompleted({ updatedUser: result })),
                catchError(err => of(updateProfileError({ errorMessage: err.error.message })))
            )
        ),
    ))

    //DDEY: we use the method bellow so that after each update to display the current information about the user in all components that use it
    onProfileUpdateCompleted$ = createEffect(() => this.actions$.pipe(
        ofType(updateProfileCompleted),
        map(result => login({ user: result.updatedUser }))
    ))

}