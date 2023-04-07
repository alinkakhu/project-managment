import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/shared/services/board.service';
import { Board, BoardTitle } from 'src/app/shared/interfaces/board.interface';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
@Input() board!:Board
constructor(private boardsService:BoardService, private dialog:MatDialog){}
ngOnInit(): void {
}
onDelete(boardtoDelete:any){
  Dialog.confirm(this.dialog, async () => {
    this.boardsService.deleteBoard(boardtoDelete._id).subscribe((data)=>{
      console.log(boardtoDelete._id)
    },
    (error)=>{
      console.log(error)
    } );
  })

}

}
