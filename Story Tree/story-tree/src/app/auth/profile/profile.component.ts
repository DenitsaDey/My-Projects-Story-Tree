import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IFullUser, IProfile, IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { IAuthModuleState } from '../+store';
import { enterEditMode, exitEditMode, profileLoaded, profilePageInitalized } from '../+store/actions';

@Component({
  selector: 'stapp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  //old version: currentUser$: Observable<IFullUser> = this.authService.currentUser$;
  currentUser$: Observable<IFullUser> = this.store.select(state => state.auth.profile.currentProfile);

  //old version: user: IFullUser;

  //old version: isInEditMode: boolean = false;
  isInEditMode$: Observable<boolean> = this.store.select(state => state.auth.profile.isInEditMode);

  hasErrorHappened: Observable<boolean> = this.store.select(state => state.auth.profile.errorHappened);


  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<IAuthModuleState>) { }

   
  ngOnInit(): void {
    this.store.dispatch(profilePageInitalized());

    this.hasErrorHappened.subscribe((hasError) => {
      if (hasError) {
        this.router.navigate(['/user/login'])
      }
    })

    //old version
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
        birthday: currentUser.birthday,
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

  updateProfile(): void {
    // TODO stoimenovg: continue. with the http update request
    console.log(this.editProfileForm.value);

    //old version: this.isInEditMode = false;
    this.exitEditMode();
  }

  exitEditMode(): void {
    this.store.dispatch(exitEditMode());
  }
}
