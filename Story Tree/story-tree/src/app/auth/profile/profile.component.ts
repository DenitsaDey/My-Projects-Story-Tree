import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IFullUser, IProfile, IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';

const userId = "b8d7263c-a032-453e-94ec-6e5d99179aba" //hard-coded for demo purposes

@Component({
  selector: 'stapp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  currentUser$: Observable<IFullUser> = this.authService.currentUser$;
  
  //TEST
  //currUserId$: Observable<string> = this.authService.currUserId$;
    
  //DDEY: TODO get infor from state
  user: IFullUser;

  isInEditMode: boolean = false;

  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private router: Router) { }

   
  ngOnInit(): void {
    
      // this.userService.getUser$().subscribe({
      //   next: (user) => {
      //     console.log(user);
      //     this.user = user;
      //     console.log(`profile:`);
      //     console.log(this.user);
      //   },
      //   error: () => {
      //     this.router.navigate(['/login'])
      //   }
      // });
      // this.currentUser$.subscribe({
      //   next: (user) =>{
      //     this.user = user;
      //   },
      //   error: () => {this.router.navigate(['/login']);}
      // })
  }

  enterEditMode(): void{
    this.isInEditMode = true;

    //DDEY when template forms are used it is advisory to use setTimeout() in order to give time to the form to detect the changes in the new values
    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        name: this.user.name,
        location: this.user.location,
        birthday: this.user.birthday,
        partnerId: this.user.partner.id,
      })
    });
  }

  updateProfile(): void {
    // TODO stoimenovg: continue. with the http update request
    console.log(this.editProfileForm.value);

    this.isInEditMode = false;
  }
}
