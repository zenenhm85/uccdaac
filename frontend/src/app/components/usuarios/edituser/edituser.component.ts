import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Global } from '../../../services/url';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
  providers: [UserService]
})
export class EdituserComponent implements OnInit {

  url: string;
  img: string;
  user: User


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
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.url = Global.url;
    this.img = this.url + "users/img/";
    this.user = this.data;
    this.data.username = '';
  }
  editUser() {
    this.data.username = this.data.username.replace(/\s/g, "").toLowerCase();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  imageUpload(imagen) {
    this.user.img = imagen.body.filename;

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
