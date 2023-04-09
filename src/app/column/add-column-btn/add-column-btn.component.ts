
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnDialogComponent } from '../column-dialog/column-dialog.component';
import { ColumnService } from 'src/app/shared/services/column.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-column-btn',
  templateUrl: './add-column-btn.component.html',
  styleUrls: ['./add-column-btn.component.css']
})
export class AddColumnBtnComponent implements OnInit {
  title!: string;
column:any = this.columnService.column;
order: number = 0;
boardId: string = "";
  constructor(
    public dialog: MatDialog,
    private columnService:ColumnService,
    private authService: AuthService,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id') || "";
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ColumnDialogComponent, {
      width: '500px',
      height: '200px',
      data: { title: this.title },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.title = result;

      this.column= { title: result,
      order: this.order,
    boardId:this.boardId  };

      this.columnService.createColumn(this.column).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

}
