export interface IMember{
    id:string;
    name: string;
    relationToMe?: string;
    partner?: string; //DDEY: we want only the name of the partner
    parent?: string; //DDEY: we want only the id of the 1st parent, but for the gojs tree model we call it just 'parent'
    profilePicSrc?: string;
    location?: string;
    birthday?: string;
    email?: string;
}