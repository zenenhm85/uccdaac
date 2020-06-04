import { Component, OnInit } from '@angular/core';
import {Global} from '../../../services/url';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  tipo:string;
  img:string;
  url:string;
  email:string;
  name:string;

  constructor() { }

  ngOnInit(): void {
    this.tipo = localStorage.getItem('tipo');
    this.url = Global.url;
    this.img = this.url+"users/img/"+localStorage.getItem('img');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
   
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('tipo');
    localStorage.removeItem('email');
    localStorage.removeItem('img');
    localStorage.removeItem('username');

  }

}
