import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { AddMemberComponent } from "./add-member/add-member.component";
import { FamilyTreePageComponent } from "./family-tree-page/family-tree-page.component";
import { MemberDetailsPageComponent } from "./member-details-page/member-details-page.component";

const routes: Routes = [
    {
        path: 'family',
        //canActivate: [AuthGuard], todo uncomment
        component: FamilyTreePageComponent
    },
    {
        path: 'family/add',
        //canActivate: [AuthGuard], TODO uncomment
        component: AddMemberComponent
    },
    {
        path: 'family/:relativeId',
        //canActivate: [AuthGuard], TODO uncomment
        component: MemberDetailsPageComponent
    },
    
];

export const FamilyRoutingModule = RouterModule.forChild(routes);