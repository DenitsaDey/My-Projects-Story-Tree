import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMember } from 'src/app/core/interfaces';
import { MemberService } from 'src/app/core/services/member.service';

const profileId = "b8d7263c-a032-453e-94ec-6e5d99179aba" //DDEY: main user Daniela's id is hard-coded for demo purposes

@Component({
  selector: 'stapp-member-details-page',
  templateUrl: './member-details-page.component.html',
  styleUrls: ['./member-details-page.component.css']
})
export class MemberDetailsPageComponent implements OnInit {

  member: IMember;
  


  constructor(private activatedRoute: ActivatedRoute, 
    private memberService: MemberService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      const relativeId = params['relativeId'];
      this.memberService.getMemberById$(profileId, relativeId).subscribe(member => {
        this.member = member;
        console.log(member);
        // this.canViewTree = this.member.shareTree - TODO: add bool shareTree option
      });
    })
  }

}
