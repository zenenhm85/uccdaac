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
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { UnidadeComponent } from './components/unidade/unidade.component';
import {EditunidadeComponent} from './components/unidade/editunidade/editunidade.component';
import {ExportarexcelService} from './services/exportarexcel.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnidadeComponent,
    EditunidadeComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    DefaultModule,
    SharedModule,
    FlexLayoutModule,
    HttpClientModule
  ],   
  entryComponents: [
    EditunidadeComponent
  ],
  providers: [ExportarexcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
