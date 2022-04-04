import { Component, OnInit } from '@angular/core';
import { IProfile } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';

const userId = "b8d7263c-a032-453e-94ec-6e5d99179aba" //hard-coded for demo purposes
@Component({
  selector: 'stapp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //DDEY: TODO get infor from state
  user: IProfile;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    
      this.userService.getUserById$(userId).subscribe(user => {
        this.user = user;
        console.log(user);
        });
  }

}
