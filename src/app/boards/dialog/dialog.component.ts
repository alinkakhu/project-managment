import {Component, Inject, OnInit} from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateBoardBtnComponent } from '../create-board-btn/create-board-btn.component';
import { BoardTitle } from 'src/app/shared/interfaces/board.interface';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  {
  constructor(
    public dialogRef: MatDialogRef<CreateBoardBtnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BoardTitle,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
