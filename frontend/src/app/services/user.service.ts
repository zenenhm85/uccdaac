import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import { UserLogin } from '../models/userlogin';
import { Global } from './url';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;

    constructor(
        private _http:HttpClient
    ){
        this.url = Global.url;        
    }
    userLogin(user:UserLogin):Observable<any>{
      return this._http.post(this.url+'auth/login',user);
    }
    getUser(username:string):Observable<User>{
      return this._http.get<User>(this.url+'users/'+username);
    }
    isLogger():Boolean{
      return !!localStorage.getItem('token');
    }
    isAdmin():Boolean{
      if(localStorage.getItem('tipo')== '1'){
        return true;
      }
      else{
        return false;
      }
    }
    getToken(){
      return localStorage.getItem('token');
    }
    /***********************Comenzando con Componente usuario**********************/
    getUsers():Observable<User[]>{
      return this._http.get<User[]>(this.url+'users');
    }
}
