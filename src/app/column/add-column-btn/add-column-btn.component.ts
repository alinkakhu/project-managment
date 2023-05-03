import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnDialogComponent } from '../column-dialog/column-dialog.component';
import { ColumnService } from 'src/app/shared/services/column.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-column-btn',
  templateUrl: './add-column-btn.component.html',
  styleUrls: ['./add-column-btn.component.css'],
})
export class AddColumnBtnComponent implements OnInit {
  @Output() addEvent = new EventEmitter();
  @Input() length!: number;
  title!: string;
  column: any = this.columnService.column;
  order: number = 0;
  boardId: string = '';
  constructor(
    public dialog: MatDialog,
    private columnService: ColumnService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id') || '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ColumnDialogComponent, {
      width: '500px',
      height: '200px',
      data: { title: this.title },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.title = result;
      this.column = {
        title: result,
        order: this.length,
        boardId: this.boardId,
      };

      this.columnService.createColumn(this.column).subscribe(
        (data) => {
          this.columnService
            .getColumns(this.boardId)
            .subscribe((data) => this.addEvent.emit(data));
        },
        (error) => {}
      );
    });
  }
}
