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
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { UnidadeComponent } from './components/unidade/unidade.component';
import {EditunidadeComponent} from './components/unidade/editunidade/editunidade.component';
import {ExportarexcelService} from './services/exportarexcel.service';
import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { InfouserComponent } from './components/usuarios/infouser/infouser.component';
import { EdituserComponent } from './components/usuarios/edituser/edituser.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnidadeComponent,
    EditunidadeComponent,
    UsuariosComponent,
    InfouserComponent,
    EdituserComponent    
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
    AngularFileUploaderModule,
    HttpClientModule
  ],   
  entryComponents: [
    EditunidadeComponent
  ],
  providers: [ExportarexcelService,
    AuthGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
