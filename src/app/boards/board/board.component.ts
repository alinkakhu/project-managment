import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardService } from 'src/app/shared/services/board.service';
import { Board, BoardTitle } from 'src/app/shared/interfaces/board.interface';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../delete-dialog/delete-dialog.component';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @Input() board!: Board;
  @Output() deleteEvent = new EventEmitter()
  constructor(
    private boardsService: BoardService,
    private dialog: MatDialog,
    private langService: LanguageService,
    private translate: TranslateService,
    private auth:AuthService
  ) {}
  ngOnInit(): void {
    this.langService.localEvent.subscribe((locale) =>
      this.translate.use(locale)
    );
  }
  onDelete(boardtoDelete: any) {
    Dialog.confirm(this.dialog, async () => {
      this.boardsService.deleteBoard(boardtoDelete._id).subscribe(
        (data) => {
          console.log(boardtoDelete._id);
          this.boardsService.getBoards(this.auth.getUserId()).subscribe((data)=>{
            this.deleteEvent.emit(data)
          })

        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
