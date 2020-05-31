import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserLogin } from '../../models/userlogin';
import { User } from '../../models/user';
import {Router} from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  user:UserLogin;

  constructor(private userService: UserService, private router:Router) { 

  }

  ngOnInit(): void {
    this.user = new UserLogin('','');
  }
  loginUser() {
    this.userService.userLogin(this.user).subscribe(
      res => {
        let userlogin: User;
        localStorage.setItem('token',res.token);        
        this.userService.getUser(this.user.username).subscribe(
          res=>{            
            if(res['user'].habilitado == 1){
              this.router.navigate(['/home']);
              localStorage.setItem('name',res['user'].name);
              localStorage.setItem('tipo',res['user'].tipo.toString());
              localStorage.setItem('email',res['user'].email);
              localStorage.setItem('img',res['user'].img);
            }
            else{
              localStorage.removeItem('token');
              swal({
                title: "Usuário desabilitado!",
                text: "Consulte ao administrador do sistema!!",
                icon: "warning"
              });
            }
            
          },
          err=>{
            console.log(err)
          }
        )                                
      },
      err => {
        swal({
          title: "Error de autenticação!",          
          icon: "warning"
        });
      }
    );
  }


}
