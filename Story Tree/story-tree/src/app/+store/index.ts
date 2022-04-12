import { IFullUser } from "../core/interfaces";

export * from './reducers';
export * from './actions';

export interface IRootState{ 
    currentUser: IFullUser
}