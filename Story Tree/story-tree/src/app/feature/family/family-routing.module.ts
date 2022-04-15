import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { AddMemberComponent } from "./add-member/add-member.component";
import { AllMembersComponent } from "./all-members/all-members.component";
import { FamilyTreePageComponent } from "./family-tree-page/family-tree-page.component";
import { MemberDetailsPageComponent } from "./member-details-page/member-details-page.component";

const routes: Routes = [
    {
        path: 'family',
        canActivate: [AuthGuard],
        component: FamilyTreePageComponent
    },
    {
        path: 'family/add',
        canActivate: [AuthGuard],
        component: AddMemberComponent
    },
    {
        path: 'family/all',
        canActivate: [AuthGuard],
        component: AllMembersComponent
    },
    {
        path: 'family/:relativeId',
        canActivate: [AuthGuard],
        component: MemberDetailsPageComponent
    },
    
];

export const FamilyRoutingModule = RouterModule.forChild(routes);