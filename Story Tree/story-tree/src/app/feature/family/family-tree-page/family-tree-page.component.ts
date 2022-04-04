import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as go from 'gojs';
import { IMember } from 'src/app/core/interfaces';
import { FamilyService } from 'src/app/core/services/family.service';
//import { IMember } from 'src/app/core/interfaces';
//import { FamilyService } from 'src/app/core/services/family.service';

const id = "b8d7263c-a032-453e-94ec-6e5d99179aba" //DDEY: main user Daniela's id is hard-coded for demo purposes

@Component({
  selector: 'stapp-family-tree-page',
  templateUrl: './family-tree-page.component.html',
  styleUrls: ['./family-tree-page.component.css']
})
export class FamilyTreePageComponent implements OnInit {

  familyMembers: IMember[];
  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {
    this.familyService.loadFamilyTree$(id).subscribe(membersList => {
      this.familyMembers = membersList;
      console.log(this.familyMembers);
    });
  }

  
  public selectedNode = null;
  /*
  we define property model in app.component so that both the diagram component 
  and the Inspector component can access it as @Input model
  */
  

  //public model: go.TreeModel = new go.TreeModel(this.familyMembers);
  public model: go.TreeModel = new go.TreeModel([{ 'key': 1, 'name': 'Stella Payne Diaz', 'title': 'CEO' },
  { 'key': 2, 'name': 'Luke Warm', 'title': 'VP Marketing/Sales', 'parent': 1 },
  { 'key': 3, 'name': 'Meg Meehan Hoffa', 'title': 'Sales', 'parent': 2 },
  { 'key': 4, 'name': 'Peggy Flaming', 'title': 'VP Engineering', 'parent': 1 },
  { 'key': 5, 'name': 'Saul Wellingood', 'title': 'Manufacturing', 'parent': 4 },
  { 'key': 6, 'name': 'Al Ligori', 'title': 'Marketing', 'parent': 2 },
  { 'key': 7, 'name': 'Dot Stubadd', 'title': 'Sales Rep', 'parent': 3 },
  { 'key': 8, 'name': 'Les Ismore', 'title': 'Project Mgr', 'parent': 5 },
  { 'key': 9, 'name': 'April Lynn Parris', 'title': 'Events Mgr', 'parent': 6 },
  { 'key': 10, 'name': 'Xavier Breath', 'title': 'Engineering', 'parent': 4 },
  { 'key': 11, 'name': 'Anita Hammer', 'title': 'Process', 'parent': 5 },
  { 'key': 12, 'name': 'Billy Aiken', 'title': 'Software', 'parent': 10 },
  { 'key': 13, 'name': 'Stan Wellback', 'title': 'Testing', 'parent': 10 },
  { 'key': 14, 'name': 'Marge Innovera', 'title': 'Hardware', 'parent': 10 },
  { 'key': 15, 'name': 'Evan Elpus', 'title': 'Quality', 'parent': 5 },
  { 'key': 16, 'name': 'Lotta B. Essen', 'title': 'Sales Rep', 'parent': 3 }]);

  public setSelectedNode(node){
    this.selectedNode = node;
  }
  
}
