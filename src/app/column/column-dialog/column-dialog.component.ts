import { Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddColumnBtnComponent } from '../add-column-btn/add-column-btn.component';
import { Column } from 'src/app/shared/interfaces/column.interface';

@Component({
  selector: 'app-column-dialog',
  templateUrl: './column-dialog.component.html',
  styleUrls: ['./column-dialog.component.css'],
})
export class ColumnDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddColumnBtnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Column
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
