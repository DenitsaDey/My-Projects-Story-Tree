import { createAction, props } from "@ngrx/store";
import { IFullUser } from "../core/interfaces";


const currentUserDomain = '[CurrentUser]'
export const login = createAction(`${currentUserDomain} SignIn`, props<{ user: IFullUser }>());
export const logout = createAction(`${currentUserDomain} Logout`);