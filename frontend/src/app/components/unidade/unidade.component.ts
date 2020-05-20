import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import {UnidadeService} from '../../services/unidade.service';
import {Unidade} from '../../models/unidade';

export interface UnidadeElement {
  nome: string;  
}
@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css'],
  providers: [UnidadeService]
})
export class UnidadeComponent implements OnInit {
  
  
  displayedColumns: string[] = ['siglas','nome','actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  searchKey:string;

  

  constructor(private unidadeService: UnidadeService) {
   
   }

  ngOnInit(): void {    
    this.getUnidades();    
  }
  getUnidades(){
    this.unidadeService.getUnidades().subscribe(
      res=> {        
        this.dataSource = new MatTableDataSource(res['unidades']);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;    
        this.paginator._intl.itemsPerPageLabel= "Elementos por páginas"; 
        this.paginator._intl.nextPageLabel= "página seguinte";     
        this.paginator._intl.previousPageLabel= "página anterior"; 
        this.paginator._intl.firstPageLabel= "primeira página";
        this.paginator._intl.lastPageLabel= "última página";      
      },
      err=> console.log(err) 
    );
  }
  limpiar(){
    this.searchKey="";
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  Filtrar(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  
}
