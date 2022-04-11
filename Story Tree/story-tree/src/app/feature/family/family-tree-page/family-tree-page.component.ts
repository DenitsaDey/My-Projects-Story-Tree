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

  familyMembers: IMember[] = [];

  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {
    this.familyService.loadFamilyTree$().subscribe(membersList => 
      {
      this.familyMembers = membersList;
      console.log(this.familyMembers);
    });
  }

  
  public selectedNode = null;
  /*
  we define property model in app.component so that both the diagram component 
  and the Inspector component can access it as @Input model
  */
  

  //public model: go.TreeModel = new go.TreeModel(this.familyMembers); or new go.TreeModel(nodeDataArray:[{..}, {..}, ..])
  //public model: go.TreeModel = new go.TreeModel(this.familyMembers);
   
  // public model: go.TreeModel = new go.TreeModel([{ 'id': 1, 'name': 'Stella Payne Diaz', 'relationToMe': 'CEO' },
  // { 'id': 2, 'name': 'Luke Warm', 'relationToMe': 'VP Marketing/Sales', 'parent1Id': 1 },
  // { 'id': 3, 'name': 'Meg Meehan Hoffa', 'relationToMe': 'Sales', 'parent1Id': 2 },
  // { 'id': 4, 'name': 'Peggy Flaming', 'relationToMe': 'VP Engineering', 'parent1Id': 1 },
  // { 'id': 5, 'name': 'Saul Wellingood', 'relationToMe': 'Manufacturing', 'parent1Id': 4 },
  // { 'id': 6, 'name': 'Al Ligori', 'relationToMe': 'Marketing', 'parent1Id': 2 },
  // { 'id': 7, 'name': 'Dot Stubadd', 'relationToMe': 'Sales Rep', 'parent1Id': 3 },
  // { 'id': 8, 'name': 'Les Ismore', 'relationToMe': 'Project Mgr', 'parent1Id': 5 },
  // { 'id': 9, 'name': 'April Lynn Parris', 'relationToMe': 'Events Mgr', 'parent1Id': 6 },
  // { 'id': 10, 'name': 'Xavier Breath', 'relationToMe': 'Engineering', 'parent1Id': 4 },
  // { 'id': 11, 'name': 'Anita Hammer', 'relationToMe': 'Process', 'parent1Id': 5 },
  // { 'id': 12, 'name': 'Billy Aiken', 'relationToMe': 'Software', 'parent1Id': 10 },
  // { 'id': 13, 'name': 'Stan Wellback', 'relationToMe': 'Testing', 'parent1Id': 10 },
  // { 'id': 14, 'name': 'Marge Innovera', 'relationToMe': 'Hardware', 'parent1Id': 10 },
  // { 'id': 15, 'name': 'Evan Elpus', 'relationToMe': 'Quality', 'parent1Id': 5 },
  // { 'id': 16, 'name': 'Lotta B. Essen', 'relationToMe': 'Sales Rep', 'parent1Id': 3 }]);


  public model: go.TreeModel = new go.TreeModel(
    [
      { 'key': 1, 'name': 'Stella Payne Diaz', 'relationToMe': 'CEO' },
      { 'key': 2, 'name': 'Luke Warm', 'relationToMe': 'VP Marketing/Sales', 'parent': 1 },
      { 'key': 3, 'name': 'Meg Meehan Hoffa', 'relationToMe': 'Sales', 'parent': 2 },
      { 'key': 4, 'name': 'Peggy Flaming', 'relationToMe': 'VP Engineering', 'parent': 1 },
      { 'key': 5, 'name': 'Saul Wellingood', 'relationToMe': 'Manufacturing', 'parent': 4 },
      { 'key': 6, 'name': 'Al Ligori', 'relationToMe': 'Marketing', 'parent': 2 },
      { 'key': 7, 'name': 'Dot Stubadd', 'relationToMe': 'Sales Rep', 'parent': 3 },
      { 'key': 8, 'name': 'Les Ismore', 'relationToMe': 'Project Mgr', 'parent': 5 },
      { 'key': 9, 'name': 'April Lynn Parris', 'relationToMe': 'Events Mgr', 'parent': 6 },
      { 'key': 10, 'name': 'Xavier Breath', 'relationToMe': 'Engineering', 'parent': 4 },
      { 'key': 11, 'name': 'Anita Hammer', 'relationToMe': 'Process', 'parent': 5 },
      { 'key': 12, 'name': 'Billy Aiken', 'relationToMe': 'Software', 'parent': 10 },
      { 'key': 13, 'name': 'Stan Wellback', 'relationToMe': 'Testing', 'parent': 10 },
      { 'key': 14, 'name': 'Marge Innovera', 'relationToMe': 'Hardware', 'parent': 10 },
      { 'key': 15, 'name': 'Evan Elpus', 'relationToMe': 'Quality', 'parent': 5 },
      { 'key': 16, 'name': 'Lotta B. Essen', 'relationToMe': 'Sales Rep', 'parent': 3 }
    ]
  );

  public setSelectedNode(node){
    this.selectedNode = node;
  }
  
}
