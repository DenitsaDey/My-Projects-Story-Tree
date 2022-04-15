import { AfterViewInit, Component, Input } from '@angular/core';
import { IMember } from 'src/app/core/interfaces';
import { MemberService } from 'src/app/core/services/member.service';

@Component({
  selector: 'stapp-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit {

  public _selectedMemberId: string;
  public member :IMember;


  @Input()
  get selectedMemberId() {return this._selectedMemberId; }
  set selectedMemberId(id: string) {
    if (id && id != null) {
      this._selectedMemberId = id;
      this.memberService.getMemberById$(this._selectedMemberId)
      .subscribe(member => {
        this.member = member;
      })
    } else {
      this._selectedMemberId = null;
    }
  }
  constructor(private memberService: MemberService) { }

  ngAfterViewInit(): void {
    
  }

}
