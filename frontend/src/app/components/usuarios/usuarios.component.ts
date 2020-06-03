import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { UserService } from '../../services/user.service';
import { ExportarexcelService } from '../../services/exportarexcel.service';
import { User, UserCreate } from '../../models/user';
import swal from 'sweetalert';
import { MatDialog } from '@angular/material/dialog';
import { Global } from '../../services/url';
import { FormControl } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import {InfouserComponent} from './infouser/infouser.component';
import {EdituserComponent} from './edituser/edituser.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  selected = new FormControl(0);
  displayedColumns: string[] = ['no','img','name', 'email','phone', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  searchKey: string;
  user: UserCreate;
  user2: UserCreate;
  userinfo: User;
  useredit:User;
  useredit2:User;
  url:string;
  img:string;


  users: User[];

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



  constructor(private userService: UserService, private exportxls: ExportarexcelService, private dialog: MatDialog, private dialogedit: MatDialog) {

  }

  ngOnInit(): void {
    this.url = Global.url;
    this.img = this.url+"users/img/";
    this.user = new UserCreate('', '', '', '', '', true, 1, '');
    this.user2 = new UserCreate('', '', '', '', '', true, 1, '');
    this.userinfo = new User('','','','',true,1,'');
    this.user.habilitado = true;
    this.user.tipo = 1;

    this.userService.getUsers().subscribe(
      res => {
        this.users = res['users'];
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = "Elementos por páginas";
        this.paginator._intl.nextPageLabel = "página seguinte";
        this.paginator._intl.previousPageLabel = "página anterior";
        this.paginator._intl.firstPageLabel = "primeira página";
        this.paginator._intl.lastPageLabel = "última página";
      },
      err => console.log(err)
    );
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res['users'];
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = "Elementos por páginas";
        this.paginator._intl.nextPageLabel = "página seguinte";
        this.paginator._intl.previousPageLabel = "página anterior";
        this.paginator._intl.firstPageLabel = "primeira página";
        this.paginator._intl.lastPageLabel = "última página";
      },
      err => {
        console.log(err);
      }
    );
  }
  limpiar() {
    this.searchKey = "";
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  Filtrar() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  imageUpload(data) {
    this.user.img = data.body.filename;
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
  createUsers() {
    
    if (this.user.password == this.user2.password) {
      let username = this.user.username;
      let userpassword = this.user.password;
      var saltu = bcrypt.genSaltSync(10);
      var hashu = bcrypt.hashSync(username, saltu);
      var saltp = bcrypt.genSaltSync(10);
      var hashp = bcrypt.hashSync(userpassword, saltp);
      this.user.username = hashu;
      this.user.password = hashp;
      if(this.user.img == ""){
        this.user.img = "default.png"
      }

      this.userService.createUser(this.user).subscribe(
        res => {
          this.getUsers();
          this.user = new UserCreate('', '', '', '', '', true, 1, '');
          this.user2 = new UserCreate('', '', '', '', '', true, 1, '');
          swal({
            title: "Excelente!",
            text: "Usuário criado com sucesso!!",
            icon: "success"
          });
        },
        err => console.log(err)
      );
    }
    else {
      swal({
        title: "Erro de senha!",
        text: "Não coincidem as senhas!!",
        icon: "error"
      });      
    }
  }
  deleteUser(userID: string) {
    
    swal({
      title: "Está seguro(a)?",
      text: "Não poderá desfazer esta operação!",
      icon: "warning",
      buttons: ['Cancelar', 'Aceitar'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.userService.deleteUser(userID).subscribe(
            res => {
              swal("Poof! Sua operação se realizou com sucesso!", {
                icon: "success",
              });
              this.getUsers();
            },
            err => console.log(err)
          );
        }
        else {
          swal("Tranqüilo(a),não ocorreu nada!!");
        }
      });
  }  
  infoDialog(row): void {
    this.userinfo = new User(row.name,row.username,row.email,row.phone,row.habilitado,row.tipo,row.img);   
    const dialogRef = this.dialog.open(InfouserComponent, {
      width: '600px',
      data: this.userinfo
    });    
  }
  editDialog(row){
    this.useredit = new User(row.name,row.username,row.email,row.phone,row.habilitado,row.tipo,row.img); 
    this.useredit2 = new User(row.name,row.username,row.email,row.phone,row.habilitado,row.tipo,row.img); 
   
    const dialogRef = this.dialogedit.open(EdituserComponent, {
      width: '700px',
      data: this.useredit
    });
    dialogRef.afterClosed().subscribe(result => {
      const probando: User = result;      
      if(probando != undefined){
        if (!(JSON.stringify(probando) === JSON.stringify(this.useredit2))) {
          swal({
            title: "Excelente!",
            text: "Usuário alterado com sucesso!!",
            icon: "success"
          });
          this.getUsers();
        }
      }      
    });
  }

}
