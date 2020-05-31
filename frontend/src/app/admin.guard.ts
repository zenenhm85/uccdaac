import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { UserService } from './services/user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService:UserService, private router:Router){}
  
  canActivate():boolean{
    if(this.userService.isAdmin()){
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
  
}
