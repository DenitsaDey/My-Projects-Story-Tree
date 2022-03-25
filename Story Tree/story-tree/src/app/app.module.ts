import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CoreModule } from './core/core.module';
import { PagesModule } from './feature/pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { FamilyModule } from './feature/family/family.module';


// // 1. Import the libs you need
// import { AngularFireModule } from '@angular/fire/compat/';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// // 2. add your credentials of the database from the environment.firebase
// import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // //3/ Initialize
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule, //firestore
    // AngularFireStorageModule, //storage
    // AngularFireAuthModule, //auth
    AppRoutingModule,
    FormsModule,
    FamilyModule,
    CoreModule.forRoot(),
    RouterModule,
    PagesModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent]
})
export class AppModule { }
