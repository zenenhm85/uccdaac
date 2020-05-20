import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { DefaultModule } from './layouts/default/default.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './modules/login/login.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MaterialModule,

    DefaultModule,
    SharedModule,    

    FlexLayoutModule
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
