import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Global } from '../../../services/url';
import * as bcrypt from 'bcryptjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
  providers: [UserService]
})
export class EdituserComponent implements OnInit {

  url: string;  
  img2:string;
  user: User;
  user2:User;
  id:string;


  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "10",
    uploadAPI: {
      url: Global.url + 'users',
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: false,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Subir a imagem do usuário...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    public dialogRef: MatDialogRef<EdituserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.url = Global.url;
    
    this.user = new User(this.data['data'].name,this.data['data'].username,this.data['data'].email,this.data['data'].phone,this.data['data'].habilitado,this.data['data'].tipo,this.data['data'].img);
    this.user2 = new User(this.data['data'].name,this.data['data'].username,this.data['data'].email,this.data['data'].phone,this.data['data'].habilitado,this.data['data'].tipo,this.data['data'].img);
    this.id = this.data['id'];  
    this.user2.username = '' ; 
    this.img2 = this.user2.img;     
    
    
  }
  editUser() {
    this.user2.username = this.user2.username.replace(/\s/g, "").toLowerCase();
    if(this.user2.username!=''){
      var saltu = bcrypt.genSaltSync(10);
      var hashu = bcrypt.hashSync(this.user2.username, saltu);
      this.user.username = hashu
    }
    this.userService.updateUser(this.id,this.user).subscribe(
      res => {
         
      },
      err => console.log(err)
    );    
  }
  onNoClick(): void {    
    this.dialogRef.close();  
  }
  imageUpload(imagen) {
    this.user.img = imagen.body.filename;   
    if(this.user.img != this.img2){
      this.userService.deleteImage(this.img2).subscribe(
        res => {          
          if(res.result == true){
            swal({
              title: "Excelente!",
              text: "Imagem trocada com êxito sucesso!!",
              icon: "success"
            });
          }
        },
        err => console.log(err)
      );
      const usernew = new User(this.user2.name,this.user.username,this.user2.email,this.user2.phone,this.user2.habilitado,this.user2.tipo,this.user.img);
      this.userService.updateUser(this.id,usernew).subscribe(
        res => {
           
        },
        err => console.log(err)
      );    
      this.img2 = this.user.img;
    }    
  }
  public restrictNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }
  public restrictEspace(e) {
    let key = e.keyCode || e.which;
    let tecla = String.fromCharCode(key).toLowerCase();
    let letras = "abcdefghijklmnopqrstuvwxyz0123456789.";
    let especiales = "8-37-39-46";

    let tecla_especial = false
    for (var i in especiales.split('-')) {
      if (key == i) {
        tecla_especial = true;
        break;
      }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
  }

}
