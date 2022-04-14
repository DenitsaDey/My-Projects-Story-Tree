import { IImage } from "./image";
import { IUser } from "./user";

export interface IFullUser{ 
    id?: string;
    name: string;
    email?: string;
    birthday?: string;
    location?: string;
    partner?: IUser;
    parent1?: IUser;
    parent2?: IUser;
    familyMembersCount?: number;
    relationToMe?: string;
    profilePicSrc?: string;
    gallery?: IImage[];
}