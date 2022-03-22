import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InspectorComponent } from './inspector/inspector.component';
import { FamilyModule } from './family/family.module';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CoreModule } from './core/core.module';
import { PagesModule } from './feature/pages/pages.module';


@NgModule({
  declarations: [
    AppComponent,
    InspectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FamilyModule,
    CoreModule,
    RouterModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent]
})
export class AppModule { }
