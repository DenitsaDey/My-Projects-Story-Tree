import { IRootState } from 'src/app/+store';
import { IFullUser } from 'src/app/core/interfaces';

export * from './reducers';

export interface ILoginPageState {
    errorMessage: string;
    isLoginPending: boolean;
}

export interface IProfilePageState {
    currentProfile: IFullUser,
    isInEditMode: boolean;
    errorHappened: boolean;
}

export interface IAuthState {
    profile: IProfilePageState;
    login: ILoginPageState;
}

export interface IAuthModuleState extends IRootState {
    auth: IAuthState;
}