import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { IFullUser, IImage } from 'src/app/core/interfaces';
import { MemberService } from 'src/app/core/services/member.service';
import { UserService } from 'src/app/core/services/user.service';
import { IAuthModuleState } from '../+store';
import { enterEditMode, exitEditMode, profilePageInitalized, updateProfileStarted } from '../+store/actions';

export interface CarouselImage{ imageSrc: string;}
@Component({
  selector: 'stapp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  //old version: currentUser$: Observable<IFullUser> = this.authService.currentUser$;

  //DDEY: we can pipe the observable to set the currentUser and use it directly in the html, or else set it in the html as currentUser$ | async
   //currentUser: IFullUser;
  currentUser$: Observable<IFullUser> = this.store.select(state => state.auth.profile.currentProfile)
     //.pipe(tap(profile => this.currentUser = profile))
    ;

  //old version: user: IFullUser;

  //old version: isInEditMode: boolean = false;
  isInEditMode$: Observable<boolean> = this.store.select(state => state.auth.profile.isInEditMode);

  hasErrorHappened: Observable<boolean> = this.store.select(state => state.auth.profile.errorHappened);

  newProfilePicture?: File;
  newGalleryPicture?: File;

  //DDEY: used for populating the drop-down menu for Partner in Edit mode
  members = [];

  //gallery: CarouselImage[] = [{imageSrc: 'http://localhost:19986/I…/sincerely-225318523.jpg'}, {imageSrc: 'http://localhost:19986/I…/noah-busch225344455.jpg'}];
  gallery : IImage[] = [];
  selectedIndex = 1;
  slideInterval = 3000; //DDEY: Default to 3 secs

  //startIndex = 0;

  constructor(
    private memberService: MemberService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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

    this.userService.getUser$().subscribe( (user) =>{
      this.gallery = user.gallery;
    });


    //this.autoSlideGallery();

    //this.Repeat();

    /*DDEY: old version replaced by profilePageInitalized()
      this.userService.getUser$().subscribe({
        next: (user) => {
          this.user = user;
        },
        error: () => {
          this.router.navigate(['/login'])
        }
      });


      this.userService.getUser$().subscribe( (user) =>{
          this.user = user;
        })
  */

  }

  // ngAfterViewInit(): void{
  //   this.autoSlideGallery();
  // }

  // autoSlideGallery(): void{
  //   setInterval(() =>{
  //     this.onNextClick();
  //     this.autoSlideGallery();
  //   }, this.slideInterval);
  // }

  // onNextClick(): void{
  //   if(this.selectedIndex === this.gallery.length -1){
  //     this.selectedIndex = 1;
  //   } else{
  //     this.selectedIndex++;
  //   }
  // }

  // selectImage(index: number): void{
  //   this.selectedIndex = index;
  // }
  /*
  Repeat(){
    setTimeout(() => {
      this.__FunctionSlide();
      this.Repeat();
    }, 2000);
  }

  __FunctionSlide() {
    const slides = Array.from(document.getElementsByClassName('mall-show-slide'));
    if (slides === []) {
      this.Repeat();
    }
    for (const x of slides) {
      const y = x as HTMLElement;
      y.style.display = 'none';
    }
    if (this.startIndex > slides.length - 1) {
      this.startIndex = 0;
      const slide = slides[this.startIndex] as HTMLElement;
      slide.style.display = 'block';
      this.startIndex++;
    } else {

      const slide = slides[this.startIndex] as HTMLElement;
      slide.style.display = 'block';
      this.startIndex++;
    }
  }
  */

  enterEditMode(currentUser: IFullUser): void {
    this.store.dispatch(enterEditMode());

    //DDEY when template forms are used it is advisory to use setTimeout() in order to give time to the form to detect the changes in the new values
    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        name: currentUser.name,
        location: currentUser.location,
        partnerName: currentUser.partner.name,
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

    this.store.dispatch(updateProfileStarted({
      user: {
        name: this.editProfileForm.value.name,
        location: this.editProfileForm.value.location,
        partnerName: this.editProfileForm.value.partnerName,
        profilePicture: this.newProfilePicture,
        newGalleryPicture: this.newGalleryPicture,
      }
    }));

    //old version: this.isInEditMode = false;
    this.exitEditMode();
  }

  // updateProfile(editProfileForm: NgForm){
  //   this.userService.updateProfile$(editProfileForm.value).subscribe({
  //     next:(user) => {
  //       this.store.dispatch(profilePageInitalized());
  //       this.router.navigate(['../', 'profile'], { relativeTo: this.activatedRoute})
  //     },
  //     error:(err) => {
  //       console.log(err);
  //     }
  //   })
  //   this.exitEditMode();

  // }

  exitEditMode(): void {
    this.store.dispatch(exitEditMode());
  }

  //DDEY: changing profile pic
  handleProfilePictureChange(event: InputEvent) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.newProfilePicture = input.files[0];
  }

  //DDEY: adding new picture to profile's gallery
  handleGalleryPictureChange(event: InputEvent) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.newGalleryPicture = input.files[0];
  }
}
