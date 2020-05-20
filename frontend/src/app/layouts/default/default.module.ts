import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';



import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardService } from 'src/app/modules/dashboard.service';

import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    
    FlexLayoutModule,
    
    MaterialModule
  ],
  providers:[
    DashboardService
  ]
})
export class DefaultModule { }
