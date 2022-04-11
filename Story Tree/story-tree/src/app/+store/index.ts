import { IFullUser } from "../core/interfaces";

export * from './reducer';
export * from './actions';

export interface IRootState{ 
    currentUser: IFullUser
}