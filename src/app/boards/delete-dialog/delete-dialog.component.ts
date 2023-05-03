import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export class Dialog {
  public static confirm(dialog: MatDialog, subscription: Function): void {
    const dialogRef = dialog.open(DeleteDialogComponent, {
      width: '500px',
      height: '200px',
      data: new DialogModel('', ''),
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        subscription();
      }
    });
  }
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  title: string;
  message: string;
  @Output() addEvent = new EventEmitter();
  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogModel
  ) {
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
  constructor(public title: string, public message: string) {}
}
