import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFullUser } from "src/app/core/interfaces";
import { IAuthState } from ".";

export const authSelector = createFeatureSelector<IAuthState>('auth'); //DDEY: takes the auth state from the global IRootState in store/index.ts
export const currentUserSelector = createFeatureSelector<IFullUser>('currentUser')
export const loginErrorMessageSelector = createSelector(authSelector, (authState) => {
    return authState.login.errorMessage
});
export const loginIsLoginPendingSelector = createSelector(
    authSelector,
    currentUserSelector,
    (authState: IAuthState, currentUser: IFullUser) => {
        return authState.login.isLoginPending && !!currentUser
    }
);