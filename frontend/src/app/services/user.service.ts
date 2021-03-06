import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import { UserLogin } from '../models/userlogin';
import { Global } from './url';
import {User, UserCreate} from '../models/user';

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
    getUserHash(username:string):Observable<UserCreate>{
      return this._http.get<any>(this.url+'users/userhash/'+username);
    }
    getUsers():Observable<User[]>{
      return this._http.get<User[]>(this.url+'users');
    }
    createUser(user:User):Observable<User>{
      return this._http.post<User>(this.url+'users/create',user);      
    }
    deleteUser(userID:string):Observable<User>{
      return this._http.delete<User>(this.url+'users/delete/'+userID);      
    }
    deleteImage(img:string):Observable<any>{
      
      return this._http.get<any>(this.url+'users/image/'+img);      
    }
    updateUser(userID:string,user:User ):Observable<User>{      
      return this._http.put<User>(this.url+'users/update/'+userID,user);      
    }
    changePassword(user:UserLogin):Observable<User>{
      return this._http.post<any>(this.url+'users/change',user);      
    }
}
