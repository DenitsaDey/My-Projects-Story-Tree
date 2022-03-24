import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyTreePageComponent } from './family-tree-page/family-tree-page.component';
import { FamilyDiagramComponent } from './family-diagram/family-diagram.component';
import { InspectorComponent } from './inspector/inspector.component';
import { FormsModule } from '@angular/forms';
import { MemberDetailsPageComponent } from './member-details-page/member-details-page.component';
import { FamilyRoutingModule } from './family-routing.module';



@NgModule({
  declarations: [
    FamilyTreePageComponent,
    FamilyDiagramComponent,
    InspectorComponent,
    MemberDetailsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FamilyRoutingModule
  ],
  exports: [
    FamilyTreePageComponent,
  ]
})
export class FamilyModule { }