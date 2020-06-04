import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { LoginComponent } from './modules/login/login.component';
import {UnidadeComponent} from './components/unidade/unidade.component'; 
import {UsuariosComponent} from './components/usuarios/usuarios.component';
import { ChangepasswordComponent } from './components/usuarios/changepassword/changepassword.component';


import {AuthGuard} from './auth.guard';
import { AdminGuard } from './admin.guard';



const routes: Routes = [
  {
    path:'home',
    component:DefaultComponent,
    canActivate:[AuthGuard],
    children:[{
      path:'',
      component:DashboardComponent
    },
    {
      path:'posts',
      component:PostsComponent
    },
    {
      path:'unidade',
      component:UnidadeComponent,
      canActivate:[AdminGuard]
    },
    {
      path:'usuarios',
      component:UsuariosComponent,
      canActivate:[AdminGuard]
    },
    {
      path:'trocarsenha',
      component:ChangepasswordComponent
    }       
  ]
  },
  {
    path:'',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
