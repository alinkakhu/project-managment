import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-column',
  templateUrl: './delete-column.component.html',
  styleUrls: ['./delete-column.component.css']
})
export class DeleteColumnComponent {
  title: string;
  message: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteColumnComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogModel) {
    this.title = data.title;
    this.message = data.message;
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export class DialogModel {
  constructor(public title: string, public message: string) {
  }
}
