import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserService } from './services/user.service';
import { storageServiceProvider } from './services/storage.service';
import { MemberService } from './services/member.service';
import { FamilyService } from './services/family.service';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule {  
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {  //meaning the services will be instantiated only once (i.e. will be Singleton)
      ngModule: CoreModule,
      providers: [
        UserService,
        MemberService,
        FamilyService,
        storageServiceProvider
      ]
    }
  }
 }
