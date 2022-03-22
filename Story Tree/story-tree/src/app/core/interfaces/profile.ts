export interface IProfile{
    id: string;
    relationship: string; //IProfile
    firstName: string;
    lastName: string;
    password: string;
    birthDate: string;
    parent: string[];//IProfile
    pictures: string[];
    location: string;
}