export interface IMember{
    id:string;
    name: string;
    birthday: string;
    location: string;
    relationToMe: string;
    partnerId: string | null;
    parent1Id: string | null;
    parent2Id: string | null;
}