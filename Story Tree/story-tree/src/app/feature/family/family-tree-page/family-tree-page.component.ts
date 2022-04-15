import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as go from 'gojs';
import { IMember } from 'src/app/core/interfaces';
import { FamilyService } from 'src/app/core/services/family.service';
//import { IMember } from 'src/app/core/interfaces';
//import { FamilyService } from 'src/app/core/services/family.service';

type MyArrayType = Array<{ 'key': string, 'name': string, 'relationToMe': string, 'parent'?: string }>;

@Component({
  selector: 'stapp-family-tree-page',
  templateUrl: './family-tree-page.component.html',
  styleUrls: ['./family-tree-page.component.css']
})
export class FamilyTreePageComponent implements OnInit {


  familyMembers: IMember[] = [];
  defaultData: MyArrayType = [];
  testData: go.ObjectData[] = [];


  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {

    
    this.familyService.loadFamilyTree$().subscribe(membersList => {
      this.familyMembers = membersList;
      console.log(this.familyMembers);
      // membersList.map((familyMember) =>{
      //   return (
      //     {key: familyMember.key.replace(/-/g,""),
      //     name: familyMember.name,
      //     relationToMe: familyMember.relationToMe,
      //     parent: familyMember.parent? familyMember.parent.replace(/-/g,"") : null,
      //   }); 
      // }).forEach(familyMember => this.defaultData.push(familyMember));
      this.defaultData = this.familyMembers
        .map(familyMember => ({
          //'id': familyMember.id,
          'key': familyMember.id.replace(/-/g, ""),
          'name': familyMember.name,
          'relationToMe': familyMember.relationToMe,
          'parent': familyMember.parent ? familyMember.parent.replace(/-/g, "") : null,
        }));
      console.log('new array')
      console.log(this.defaultData);

      console.log('2nd array')
      console.log(this.defaultData2);

      this.testData = this.familyMembers
        .map(familyMember => ({
          //'id': familyMember.id,
          'key': familyMember.id.replace(/-/g, ""),
          'name': familyMember.name,
          'relationToMe': familyMember.relationToMe,
          'parent': familyMember.parent ? familyMember.parent.replace(/-/g, "") : null,
        }));

        
    console.log('test array')
    console.log(this.testData);
    });


  }



  defaultData2: MyArrayType =
    [{ 'key': '5', 'name': 'Simone Stoic', 'relationToMe': 'cousin', 'parent': '4' },
    { 'key': '14', 'name': 'Alexander Dess', 'relationToMe': 'husband' },
    { 'key': '9', 'name': 'Michael Vel', 'relationToMe': 'nephew', 'parent': '6' },
    { 'key': '7', 'name': 'Dario Dess', 'relationToMe': 'son', 'parent': '3' },
    { 'key': '8', 'name': 'Bryan Vel', 'relationToMe': 'nephew', 'parent': '6' },
    { 'key': '15', 'name': 'Ian Vel', 'relationToMe': 'brother-in-law' },
    { 'key': '11', 'name': 'Velina Vouche', 'relationToMe': 'grandma' },
    { 'key': '16', 'name': 'Sonya Dess', 'relationToMe': 'daughter', 'parent': '3' },
    { 'key': '1', 'name': 'Stella Milan', 'relationToMe': 'grandma' },
    { 'key': '2', 'name': 'Domnic Milan', 'relationToMe': 'father', 'parent': '1' },
    { 'key': '10', 'name': 'Natalie Stoic', 'relationToMe': 'cousin', 'parent': '4' },
    { 'key': '3', 'name': 'Daniela Dess', 'relationToMe': 'Me', 'parent': '2' },
    { 'key': '6', 'name': 'Vivian Vel', 'relationToMe': 'sister', 'parent': '2' },
    { 'key': '13', 'name': 'Stoil Vouche', 'relationToMe': 'uncle', 'parent': '11' },
    { 'key': '12', 'name': 'Severina Milan', 'relationToMe': 'mother', 'parent': '11' },
    { 'key': '4', 'name': 'Nadine Milan', 'relationToMe': 'aunt', 'parent': '1' },
    ];

  

  public selectedNode = null;
  /*
  we define property model in app.component so that both the diagram component 
  and the Inspector component can access it as @Input model
  */


  //public model: go.TreeModel = new go.TreeModel(this.familyMembers); or new go.TreeModel(nodeDataArray:[{..}, {..}, ..])
  public model: go.TreeModel = new go.TreeModel(this.defaultData2);

  // public model: go.TreeModel = new go.TreeModel([{ 'id': 1, 'name': 'Stella Payne Diaz', 'relationToMe': 'CEO' },
  // { 'id': 2, 'name': 'Luke Warm', 'relationToMe': 'VP Marketing/Sales', 'parent': 1 },
  // { 'id': 3, 'name': 'Meg Meehan Hoffa', 'relationToMe': 'Sales', 'parent': 2 },
  // { 'id': 4, 'name': 'Peggy Flaming', 'relationToMe': 'VP Engineering', 'parent': 1 },
  // { 'id': 5, 'name': 'Saul Wellingood', 'relationToMe': 'Manufacturing', 'parent': 4 },
  // { 'id': 6, 'name': 'Al Ligori', 'relationToMe': 'Marketing', 'parent': 2 },
  // { 'id': 7, 'name': 'Dot Stubadd', 'relationToMe': 'Sales Rep', 'parent': 3 },
  // { 'id': 8, 'name': 'Les Ismore', 'relationToMe': 'Project Mgr', 'parent': 5 },
  // { 'id': 9, 'name': 'April Lynn Parris', 'relationToMe': 'Events Mgr', 'parent': 6 },
  // { 'id': 10, 'name': 'Xavier Breath', 'relationToMe': 'Engineering', 'parent': 4 },
  // { 'id': 11, 'name': 'Anita Hammer', 'relationToMe': 'Process', 'parent': 5 },
  // { 'id': 12, 'name': 'Billy Aiken', 'relationToMe': 'Software', 'parent': 10 },
  // { 'id': 13, 'name': 'Stan Wellback', 'relationToMe': 'Testing', 'parent': 10 },
  // { 'id': 14, 'name': 'Marge Innovera', 'relationToMe': 'Hardware', 'parent': 10 },
  // { 'id': 15, 'name': 'Evan Elpus', 'relationToMe': 'Quality', 'parent': 5 },
  // { 'id': 16, 'name': 'Lotta B. Essen', 'relationToMe': 'Sales Rep', 'parent': 3 }]);


  // public model: go.TreeModel = new go.TreeModel(
  //   [
  //     { 'key': 1, 'name': 'Stella Payne Diaz', 'relationToMe': 'CEO' },
  //     { 'key': 2, 'name': 'Luke Warm', 'relationToMe': 'VP Marketing/Sales', 'parent': 1 },
  //     { 'key': 3, 'name': 'Meg Meehan Hoffa', 'relationToMe': 'Sales', 'parent': 2 },
  //     { 'key': 4, 'name': 'Peggy Flaming', 'relationToMe': 'VP Engineering', 'parent': 1 },
  //     { 'key': 5, 'name': 'Saul Wellingood', 'relationToMe': 'Manufacturing', 'parent': 4 },
  //     { 'key': 6, 'name': 'Al Ligori', 'relationToMe': 'Marketing', 'parent': 2 },
  //     { 'key': 7, 'name': 'Dot Stubadd', 'relationToMe': 'Sales Rep', 'parent': 3 },
  //     { 'key': 8, 'name': 'Les Ismore', 'relationToMe': 'Project Mgr', 'parent': 5 },
  //     { 'key': 9, 'name': 'April Lynn Parris', 'relationToMe': 'Events Mgr', 'parent': 6 },
  //     { 'key': 10, 'name': 'Xavier Breath', 'relationToMe': 'Engineering', 'parent': 4 },
  //     { 'key': 11, 'name': 'Anita Hammer', 'relationToMe': 'Process', 'parent': 5 },
  //     { 'key': 12, 'name': 'Billy Aiken', 'relationToMe': 'Software', 'parent': 10 },
  //     { 'key': 13, 'name': 'Stan Wellback', 'relationToMe': 'Testing', 'parent': 10 },
  //     { 'key': 14, 'name': 'Marge Innovera', 'relationToMe': 'Hardware', 'parent': 10 },
  //     { 'key': 15, 'name': 'Evan Elpus', 'relationToMe': 'Quality', 'parent': 5 },
  //     { 'key': 16, 'name': 'Lotta B. Essen', 'relationToMe': 'Sales Rep', 'parent': 3 }
  //   ]
  // );

  public setSelectedNode(node) {
    this.selectedNode = node;
  }

}
