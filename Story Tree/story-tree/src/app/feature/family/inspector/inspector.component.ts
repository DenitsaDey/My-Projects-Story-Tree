import { Component, Input, OnInit } from '@angular/core';
import * as go from 'gojs';

const memberId = '36a655ce-82af-441d-8e11-5149ac9756be';

@Component({
  selector: 'stapp-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent{

  public _selectedNode: go.Node;
  public data = {
    name: null,
    relationToMe: null,
    parent: null,
  };

  //public editMode = false;

  /*we need to make sure that when we use the Inspector
   to edit a Node's name property, that change affects the Model defined in the app component.ts
   Before we can do that, we need to let the inspector component know which Node (if any)
   is selected in the Diagaram. To do that we must define a new Angular @Output() property in the diagram component,
   that will be called nodeClicked and will be a new Angular eventEmmitter instance
  */
  @Input()
  public model: go.Model;

  @Input()
  get selectedNode() {return this._selectedNode; }
  set selectedNode(node: go.Node) {
    if (node && node != null) {
      this._selectedNode = node;
      this.data.name = this._selectedNode.data.name;
      this.data.relationToMe = this._selectedNode.data.relationToMe;
      this.data.parent = this._selectedNode.data.parent;
    } else {
      this._selectedNode = null;
    }
  }
  

  constructor() { }

  

  public onCommitForm() {
    this.model.startTransaction();
    this.model.set(this.selectedNode.data, 'name', this.data.name);
    this.model.set(this.selectedNode.data, 'relationToMe', this.data.relationToMe);
    this.model.set(this.selectedNode.data, 'parent', this.data.parent);
    this.model.commitTransaction();
    //this.editMode = false;
  }

  // public enterEditMode(): void {
  //   this.editMode = true;
  // }

  // public exitEditMode(): void {
  //   this.editMode = false;
  // }
}
