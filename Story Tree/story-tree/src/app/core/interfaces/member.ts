export interface IMember{
    id:string;
    name: string;
    relationToMe: string;
    partnerId: string | null;
    parent1Id: string | null;
    parent2Id: string | null;
    //DDEY: TODO - to add options for profile pic and button Details if prop bool shareInfo is true
}