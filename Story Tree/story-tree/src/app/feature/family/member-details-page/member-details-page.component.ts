import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IImage, IMemberDetails } from 'src/app/core/interfaces';
import { MemberService } from 'src/app/core/services/member.service';

@Component({
  selector: 'stapp-member-details-page',
  templateUrl: './member-details-page.component.html',
  styleUrls: ['./member-details-page.component.css']
})
export class MemberDetailsPageComponent implements OnInit {

  member: IMemberDetails;
  gallery : IImage[];
  



  constructor(private activatedRoute: ActivatedRoute, 
    private memberService: MemberService) { }

  ngOnInit(): void {
    // DDEY: when we use snapshot it does not refresh when the param in the url is changes
    // for this reason we subscribe to the activated route to be able to change the Id of the realtive dinamically
    this.activatedRoute.params.subscribe(params =>{
      const relativeId = params['relativeId'];
      this.memberService.getMemberById$(relativeId).subscribe(member => {
        this.member = member;
        this.gallery = member.gallery;
      });
    })

  }

}
