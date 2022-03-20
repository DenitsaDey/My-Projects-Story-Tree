import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyDiagramComponent } from './family-diagram/family-diagram.component';



@NgModule({
  declarations: [
    FamilyDiagramComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FamilyDiagramComponent
  ]
})
export class FamilyModule { }
