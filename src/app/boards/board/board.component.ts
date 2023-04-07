import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/shared/services/board.service';
import { Board } from 'src/app/shared/interfaces/board.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
@Input() board!:Board
constructor(private boardsService:BoardService){}
ngOnInit(): void {

}
}
