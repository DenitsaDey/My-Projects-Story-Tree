import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMemberDetails } from 'src/app/core/interfaces';
import { MemberService } from 'src/app/core/services/member.service';

const profileId = "b8d7263c-a032-453e-94ec-6e5d99179aba" //DDEY: main user Daniela's id is hard-coded for demo purposes

@Component({
  selector: 'stapp-member-details-page',
  templateUrl: './member-details-page.component.html',
  styleUrls: ['./member-details-page.component.css']
})
export class MemberDetailsPageComponent implements OnInit {

  member: IMemberDetails;
  //canSubscribe: boolean = false;


  constructor(private activatedRoute: ActivatedRoute, 
    private memberService: MemberService) { }

  ngOnInit(): void {
    // DDEY: when we use snapshot it does not refresh when the param in the url is changes
    // for this reason we subscribe to the activated route to be able to change the Id of the realtive dinamically
    this.activatedRoute.params.subscribe(params =>{
      const relativeId = params['relativeId'];
      this.memberService.getMemberById$(profileId, relativeId).subscribe(member => {
        this.member = member;
        console.log(member);
      });
    })
  }

  /* DDEY: for demo purpose of the button styling in the .html file
  ngOnChanges(): void{
    this.canSubscribe = this.member.shareInfo
  }
  */

}
