import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MemberService } from 'src/app/core/services/member.service';

const profileId = 'b8d7263c-a032-453e-94ec-6e5d99179aba'; //DDEY hard-coded for demo purposes, but to be later taken from the jwt
@Component({
  selector: 'stapp-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit, AfterViewInit {

  @ViewChild('addMemberForm') addMemberForm: NgForm;

  members = [];

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
  constructor(private memberService: MemberService) { }

  ngOnInit(): void {

    this.memberService.getAllMembers$(profileId).subscribe(
(response) => this.members = response
    );
  }

  ngAfterViewInit(): void{
    //console.log(this.);
  }

  onSubmit(addMemberForm: NgForm): void {
    console.log(addMemberForm.value);
    
  }

  clearForm():void{
    this.addMemberForm.reset();
  }
}
