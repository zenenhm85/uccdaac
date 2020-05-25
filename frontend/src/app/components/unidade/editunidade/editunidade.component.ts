import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unidade } from '../../../models/unidade';
import {UnidadeService} from '../../../services/unidade.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-editunidade',
  templateUrl: './editunidade.component.html',
  styleUrls: ['./editunidade.component.css'],
  providers: [UnidadeService]
})
export class EditunidadeComponent implements OnInit {

  
  constructor(
    public dialogRef: MatDialogRef<EditunidadeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Unidade,
    private unidadeService: UnidadeService) { 
      
    }

    

  ngOnInit(): void {
    
  }
  editUnidades() {
    this.unidadeService.updateUnidade(this.data.id,this.data).subscribe(
      res => {             
      },
      err => console.log(err)
    );    
  }
  onNoClick(): void {
    
    this.dialogRef.close();    
  }
}
