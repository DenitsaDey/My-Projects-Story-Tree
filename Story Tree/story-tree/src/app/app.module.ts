import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InspectorComponent } from './inspector/inspector.component';
import { FamilyModule } from './family/family.module';

@NgModule({
  declarations: [
    AppComponent,
    InspectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FamilyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
