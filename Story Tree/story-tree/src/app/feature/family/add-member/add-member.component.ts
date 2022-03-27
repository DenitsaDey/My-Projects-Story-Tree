import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'stapp-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit, AfterViewInit {

  @ViewChild('addMemberForm') addMemberForm: NgForm;

  members = [
    {name: 'mom', id: 1},
    {name: 'dad', id: 2},
    {name: 'husband', id: 3},
  ];

  relations: string[] = [
    'mom',
    'dad',
    'grandma',
    'grandpa',
    'sister',
    'brother',
    'aunt',
    'uncle',
    'cousin',
    'nephew',
    'niece',
    'brother-in-law',
    'sister-in-law',
  ];
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    //console.log(this.);
  }

  onSubmit(): void {
    console.log(this.addMemberForm.value);
  }

  clearForm():void{
    this.addMemberForm.reset();
  }
}
