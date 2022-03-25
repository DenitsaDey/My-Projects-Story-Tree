import { RouterModule, Routes } from "@angular/router";
import { AddMemberComponent } from "./add-member/add-member.component";
import { FamilyTreePageComponent } from "./family-tree-page/family-tree-page.component";
import { MemberDetailsPageComponent } from "./member-details-page/member-details-page.component";

const routes: Routes = [
    {
        path: 'family',
        component: FamilyTreePageComponent
    },
    {
        path: 'family/add',
        component: AddMemberComponent
    },
    {
        path: 'family/:memberId',
        component: MemberDetailsPageComponent
    },
    
];

export const FamilyRoutingModule = RouterModule.forChild(routes);