import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFullUser } from 'src/app/core/interfaces';
import { MemberService } from 'src/app/core/services/member.service';
import { UserService } from 'src/app/core/services/user.service';
import { IAuthModuleState } from '../+store';
import { enterEditMode, exitEditMode, profilePageInitalized, updateProfileStarted } from '../+store/actions';

@Component({
  selector: 'stapp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  //old version: currentUser$: Observable<IFullUser> = this.authService.currentUser$;
  
  //DDEY: we can pipe the observable to set the currentUser and use it directly in the html, or else set it in the html as currentUser$ | async
  // currentUser: IUser;
  currentUser$: Observable<IFullUser> = this.store.select(state => state.auth.profile.currentProfile)
  // .pipe(tap(profile => this.currentUser = profile))
  ;

  //old version: user: IFullUser;

  //old version: isInEditMode: boolean = false;
  isInEditMode$: Observable<boolean> = this.store.select(state => state.auth.profile.isInEditMode);

  hasErrorHappened: Observable<boolean> = this.store.select(state => state.auth.profile.errorHappened);

  newProfilePicture?: File;

  members = [];

  constructor(
    private memberService: MemberService,
    private userService: UserService,
    private router: Router,
    private store: Store<IAuthModuleState>) { }

   
  ngOnInit(): void {
    this.store.dispatch(profilePageInitalized());

    this.hasErrorHappened.subscribe((hasError) => {
      if (hasError) {
        this.router.navigate(['/user/login']) //DDEY: left on purpose as 'login' instead of redirecting to 'signin' in order for the 'Not found' page to be called as a clue that the error comes from here 
      }
    });

    this.memberService.getAllMembers$().subscribe(
      (response) => this.members = response
          );

    //old version replaced by profilePageInitalized()
      // this.userService.getUser$().subscribe({
      //   next: (user) => {
      //     this.user = user;
      //   },
      //   error: () => {
      //     this.router.navigate(['/login'])
      //   }
      // });

      
      // this.userService.getUser$().subscribe( (user) =>{
      //     this.user = user;
      //   })
  }

  enterEditMode(currentUser: IFullUser): void{
    this.store.dispatch(enterEditMode());

    //DDEY when template forms are used it is advisory to use setTimeout() in order to give time to the form to detect the changes in the new values
    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        name: currentUser.name,
        location: currentUser.location,
        partner: currentUser.partner.name,
      })
    });

    /*old version: this.isInEditMode = true;

    //DDEY when template forms are used it is advisory to use setTimeout() in order to give time to the form to detect the changes in the new values
    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        name: this.user.name,
        location: this.user.location,
        birthday: this.user.birthday,
        partnerId: this.user.partner.name,
      })
    });
    */
  }

  // updateProfile(): void {

  //   this.store.dispatch(updateProfileStarted({
  //     user: {
  //       name: this.editProfileForm.value.name,
  //       location: this.editProfileForm.value.location,
  //       partnerName: this.editProfileForm.value.partner,
  //       //profilePicture: this.newProfilePicture,
  //     }
  //   }));
  //   // TODO stoimenovg: continue. with the http update request
  //   //console.log(this.editProfileForm.value);

  //   //old version: this.isInEditMode = false;
  //   //this.exitEditMode();
  // }

  updateProfile(editProfileForm: NgForm){
    this.userService.updateProfile$(editProfileForm.value).subscribe({
      next:(user) => {
        this.router.navigate(['profile']);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  exitEditMode(): void {
    this.store.dispatch(exitEditMode());
  }

  handleProfilePictureChange(event: InputEvent) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.newProfilePicture = input.files[0];
  }
}
