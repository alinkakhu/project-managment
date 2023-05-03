import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { BoardTitle } from 'src/app/shared/interfaces/board.interface';
import { BoardService } from 'src/app/shared/services/board.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-board-btn',
  templateUrl: './create-board-btn.component.html',
  styleUrls: ['./create-board-btn.component.css'],
})
export class CreateBoardBtnComponent {
  title!: string;
  board: BoardTitle = this.boardService.board;
  @Output() addEvent = new EventEmitter();
  constructor(
    public dialog: MatDialog,
    private boardService: BoardService,
    private authService: AuthService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '200px',
      data: { title: this.title },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.title = result;

      this.board = {
        title: result,
        owner: this.authService.getUserId(),
        users: [],
      };

      this.boardService.createBoard(this.board).subscribe(
        (data) => {
          this.boardService.boards = this.boardService.filter(data);
        },
        (error) => {}
      );
    });
  }
}
