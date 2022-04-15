import { IImage } from "./image";

export interface IMemberDetails{
    id:string;
    name: string;
    email:string;
    birthday:string;
    location:string;
    relationToMe: string;
    gallery?: IImage[];
    }