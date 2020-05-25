import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { UnidadeService } from '../../services/unidade.service';
import { ExportarexcelService } from '../../services/exportarexcel.service';
import { Unidade } from '../../models/unidade';
import swal from 'sweetalert';
import * as jsPDF from 'jspdf';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { EditunidadeComponent } from './editunidade/editunidade.component';


@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css'],
  providers: [UnidadeService]
})
export class UnidadeComponent implements OnInit {

  selected = new FormControl(0);
  displayedColumns: string[] = ['no', 'siglas', 'nome', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  searchKey: string;
  unidade: Unidade
  unidadeEdit: Unidade;
  unidadeEditaux: Unidade;
  unidades: Unidade[];



  constructor(private unidadeService: UnidadeService, private exportxls: ExportarexcelService, private dialog: MatDialog) {
    this.unidades = [];
    this.unidadeEdit = new Unidade('', '', '');
    this.unidadeEditaux = new Unidade('', '', '');
  }

  ngOnInit(): void {
    this.unidade = new Unidade('', '', '')
    this.unidadeService.getUnidades().subscribe(
      res => {
        this.unidades = res['unidades'];
        this.dataSource = new MatTableDataSource(this.unidades);
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
  getUnidades() {
    this.unidadeService.getUnidades().subscribe(
      res => {
        this.unidades = res['unidades'];
        this.dataSource = new MatTableDataSource(this.unidades);
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
  createUnidades() {
    this.unidadeService.createUnidade(this.unidade).subscribe(
      res => {
        this.getUnidades();
        this.unidade = new Unidade('', '', '');
        swal({
          title: "Excelente!",
          text: "Unidade Orgânica criada com sucesso!!",
          icon: "success"
        });
      },
      err => console.log(err)
    );
  }
  deleteUnidades(unidadeID: string) {
    swal({
      title: "Está seguro(a)?",
      text: "Não poderá desfazer esta operação!",
      icon: "warning",
      buttons: ['Cancelar', 'Aceitar'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.unidadeService.deleteUnidade(unidadeID).subscribe(
            res => {
              swal("Poof! Sua operação se realizou com sucesso!", {
                icon: "success",
              });
              this.getUnidades();
            },
            err => console.log(err)
          );
        }
        else {
          swal("Tranqüilo(a),não ocorreu nada!!");
        }
      });
  }
  limpiar() {
    this.searchKey = "";
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  Filtrar() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  openDialog(unidadeID: string, nome: string, siglas: string): void {
    this.unidadeEdit = new Unidade(unidadeID, nome, siglas);
    this.unidadeEditaux = new Unidade(unidadeID, nome, siglas);
    const dialogRef = this.dialog.open(EditunidadeComponent, {
      width: '400px',
      data: this.unidadeEdit
    });
    dialogRef.afterClosed().subscribe(result => {
      const probando: Unidade = result;      
      if(probando != undefined){
        if (!(JSON.stringify(probando) === JSON.stringify(this.unidadeEditaux))) {
          swal({
            title: "Excelente!",
            text: "Unidade Orgânica alterada com sucesso!!",
            icon: "success"
          });
          this.getUnidades();
        }
      }      
    });
  }
  exportarExcel() {
    this.exportxls.exportToExcel(this.dataSource.data, 'unidadeorganica')
  }
  exportarExcelFilter() {
    this.exportxls.exportToExcel(this.dataSource.filteredData, 'unidadeorganica')
  }
  exportarPDF() {
    const pdf = new jsPDF(
      {
        orientation: 'l',
        unit: 'pt',
        format: 'carta',
        posicion:2
      });
    pdf.setFontSize(16);
    pdf.setFontStyle('bold');
    pdf.text('Unidades Orgânicas',350,20)
    pdf.fromHTML(document.getElementById('unidadeTable'), 100, 15);
    pdf.save();
  }
  
}


