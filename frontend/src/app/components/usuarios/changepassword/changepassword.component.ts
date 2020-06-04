import { Component, OnInit } from '@angular/core';
import { User,UserChangePassword, UserCreate} from '../../../models/user';
import { UserLogin } from '../../../models/userlogin';

import {UserService} from '../../../services/user.service';
import {Global} from '../../../services/url';
import * as bcrypt from 'bcryptjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
  providers: [UserService]
})
export class ChangepasswordComponent implements OnInit {
  url:string
  user: UserCreate;
  userchangepassword: UserChangePassword
  constructor(private userService: UserService) { 
    
  }

  ngOnInit(): void {
    this.userchangepassword = new UserChangePassword(localStorage.getItem('username'),'','','');
    this.url = Global.url;
    this.user = new UserCreate('','','','','',true,1,'');    
    const useraux = this.userService.getUserHash(localStorage.getItem('username')).subscribe(
      res=>{
        this.user = res['user'];                            
      },
      err=> console.log(err)
    );
  }
  async changePassword(){
    if(this.userchangepassword.password != this.userchangepassword.reppassword){
      swal({
        title: "Erro de senha!",
        text: "Não coincidem as senhas!!",
        icon: "error"
      });   
    }
    else{          
      const passwordgood = await bcrypt.compare(this.userchangepassword.passwordanterior, this.user.password);    
      if(passwordgood){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(this.userchangepassword.password, salt);
        this.userService.changePassword(new UserLogin(localStorage.getItem('username'),hash)).subscribe(
          res=>{
            this.userchangepassword = new UserChangePassword(localStorage.getItem('username'),'','','');
            swal({
              title: "Excelente!",
              text: "Senha trocada com sucesso!!",
              icon: "success"
            });
          },
          err=>console.log(err)
        );        
      }
      else{
        swal({
          title: "Erro de senha!",
          text: "Senha anterior incorreta!!",
          icon: "error"
        });   
      }      
    }
  }

}
