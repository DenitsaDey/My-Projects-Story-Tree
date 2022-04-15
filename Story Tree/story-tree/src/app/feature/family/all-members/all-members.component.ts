import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMember } from 'src/app/core/interfaces';
import { FamilyService } from 'src/app/core/services/family.service';

@Component({
  selector: 'stapp-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.css']
})
export class AllMembersComponent implements OnInit {

  //DDEY: we define an Angular Input property named familyMembers and bind it in the common member component
  
  public familyModel: IMember[];
  public isLoading = true;
  

  //the output will notify the component containing the model which node will be edited
  @Output()
  public memberClicked = new EventEmitter();

  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {
    this.familyService.loadFamilyTree$().subscribe((familyTree) =>{
      this.familyModel = familyTree;
      console.log("family");
      console.log(this.familyModel);

      this.isLoading = false;
    });
  }

  public selectedMemberId = null;

  public setSelectedMemberId(id: string) {
    this.selectedMemberId = id;
  }

  // when the selection changes, emit event to app-component updating the selected node
  // addDiagramListener('ChangedSelection', (e) => {
  //   const id = e.target.id;
  //   this.memberClicked.emit(id);
  // });

}
