import {createReducer, on} from '@ngrx/store';
import { IFullUser } from '../core/interfaces';
import {  login, logout } from "./actions";

export const currentUserReducer = createReducer<IFullUser>(
    undefined,
    on(login, (_, action) => action.user),
    on(logout, () => undefined)
)