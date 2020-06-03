import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {Global} from '../../../services/url';

@Component({
  selector: 'app-infouser',
  templateUrl: './infouser.component.html',
  styleUrls: ['./infouser.component.css'],
  providers: [UserService]
})
export class InfouserComponent implements OnInit {

  url:string;
  img:string;
  
  constructor(
    public dialogRef: MatDialogRef<InfouserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.url = Global.url;
    this.img = this.url+"users/img/";

  }
  onNoClick(): void {    
    this.dialogRef.close();    
  }

}
