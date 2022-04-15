import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyTreePageComponent } from './family-tree-page/family-tree-page.component';
import { FamilyDiagramComponent } from './family-diagram/family-diagram.component';
import { InspectorComponent } from './inspector/inspector.component';
import { FormsModule } from '@angular/forms';
import { MemberDetailsPageComponent } from './member-details-page/member-details-page.component';
import { FamilyRoutingModule } from './family-routing.module';
import { AddMemberComponent } from './add-member/add-member.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllMembersComponent } from './all-members/all-members.component';
import { EditorComponent } from './editor/editor.component';




@NgModule({
  declarations: [
    FamilyTreePageComponent,
    FamilyDiagramComponent,
    InspectorComponent,
    MemberDetailsPageComponent,
    AddMemberComponent,
    AllMembersComponent,
    EditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FamilyRoutingModule,
    SharedModule
  ],
  exports: [
    FamilyTreePageComponent,
  ]
})
export class FamilyModule { }
