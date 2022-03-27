import { IBase } from './base';

export interface IUser extends IBase{
    name: string;
    email: string;
    password: string;
}