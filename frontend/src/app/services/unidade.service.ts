import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import { Unidade } from '../models/unidade';
import { Global } from './url'

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  public url: string;

    constructor(
        private _http:HttpClient
    ){
        this.url = Global.url;
        
    }
    getUnidades():Observable<Unidade[]>{
      return this._http.get<Unidade[]>(this.url+'unidade');
    }
    getUnidade(unidadesID:string):Observable<Unidade>{
      return this._http.get<Unidade>(this.url+'unidade/'+unidadesID);
    }
    createUnidade(unidade:Unidade):Observable<Unidade>{
      return this._http.post<Unidade>(this.url+'unidade/create',unidade);      
    }
    deleteUnidade(unidadeID:string):Observable<Unidade>{
      return this._http.delete<Unidade>(this.url+'unidade/delete/'+unidadeID);      
    }
    updateUnidade(unidadeID:string,unidade:Unidade ):Observable<Unidade>{
      return this._http.put<Unidade>(this.url+'unidade/update/'+unidadeID,unidade);      
    }

}
