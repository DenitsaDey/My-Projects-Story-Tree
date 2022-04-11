import {createReducer, on} from '@ngrx/store';
import { IFullUser } from '../core/interfaces';
import {  signin, logout } from "./actions";

export const currentUserReducer = createReducer<IFullUser>(
    undefined,
    on(signin, (_, action) => action.user),
    on(logout, () => undefined)
)