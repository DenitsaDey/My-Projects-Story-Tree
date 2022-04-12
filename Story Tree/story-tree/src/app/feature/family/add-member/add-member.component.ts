import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/core/services/member.service';

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
  constructor(private memberService: MemberService,
    private router: Router) { }

  ngOnInit(): void {

    this.memberService.getAllMembers$().subscribe(
(response) => this.members = response
    );
  }

  ngAfterViewInit(): void{
    //console.log(this.);
  }

  onSubmit(addMemberForm: NgForm): void {
    this.memberService.addRelative$(addMemberForm.value).subscribe({
      next: (relative) => {
        //console.log(relative);
        this.router.navigate(['/family']);
      },
      error: (err) => {
        console.log(err);
      }
    })
    
  }

  clearForm():void{
    this.addMemberForm.reset();
  }
}
