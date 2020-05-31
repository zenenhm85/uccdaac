import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { UserService } from '../../services/user.service';
import { ExportarexcelService } from '../../services/exportarexcel.service';
import { User, UserCreate} from '../../models/user';
import swal from 'sweetalert';
import * as jsPDF from 'jspdf';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  selected = new FormControl(0);
  displayedColumns: string[] = ['no', 'name', 'email', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  searchKey: string;
  user: UserCreate
  users: User[];



  constructor(private userService: UserService, private exportxls: ExportarexcelService, private dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.user = new UserCreate('','','','',1,1,'');
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
  limpiar() {
    this.searchKey = "";
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  Filtrar() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  } 
}
