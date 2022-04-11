export interface IMember{
    id:string;
    name: string;
    relationToMe?: string;
    partnerId?: string;
    parent1Id?: string;
    parent2Id?: string;
    //DDEY: TODO - to add options for profile pic and button Details if prop bool shareInfo is true
}