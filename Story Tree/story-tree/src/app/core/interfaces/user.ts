//import { IBase } from './base';

// DDEY: For demo purpose that class can extend base class
//export interface IUser extends IBase{
export interface IUser{
    id?: string;
    name: string;
    email: string;
    password?: string; //TODO DDEY: check if anywhere needed
}