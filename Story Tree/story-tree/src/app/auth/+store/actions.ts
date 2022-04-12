import { createAction, props } from "@ngrx/store"
import { IFullUser } from "src/app/core/interfaces"
import { IUpdateUserDto } from "src/app/core/services/user.service";

const profileDomain = '[ProfileComponent]'
export const profileLoaded = createAction(`${profileDomain} Profile Loaded`, props<{ profile: IFullUser }>());
export const enterEditMode = createAction(`${profileDomain} Enter Edit Mode`); //DDEY: the string Enter Edit... is id for the action and this is how the reducer will recognise it when used
export const exitEditMode = createAction(`${profileDomain} Exit Edit Mode`);
export const profilePageInitalized = createAction(`${profileDomain} Profile Initailize`)
export const profileLoadError = createAction(`${profileDomain} Error`);

export const updateProfileStarted = createAction(`${profileDomain} Update Profile Triggered`, props<{ user: IUpdateUserDto }>());
export const updateProfileError = createAction(`${profileDomain} Update Profile Error`, props<{ errorMessage: string }>());
export const updateProfileCompleted = createAction(`${profileDomain} Update Profile Completed`, props<{ updatedUser: IFullUser }>());

const loginDomain = '[LoginComponent]';
export const startLoginProcess = createAction(`${loginDomain} Start Login`);
export const endLoginProcess = createAction(`${loginDomain} End Login`);
export const loginProcessError = createAction(`${loginDomain} Login Error`, props<{ errorMessage: string}>());
export const initializeLoginState = createAction(`${loginDomain} Login Initailize`);

