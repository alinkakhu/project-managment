import { Component, OnInit} from '@angular/core';
import { Board } from 'src/app/shared/interfaces/board.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { BoardService } from 'src/app/shared/services/board.service';
import { ColumnListComponent } from 'src/app/column/column-list/column-list.component';
@Component({
  selector: 'app-big-board',
  templateUrl: './big-board.component.html',
  styleUrls: ['./big-board.component.css']
})
export class BigBoardComponent implements OnInit{
board!:any

constructor(private route: ActivatedRoute,
  private router: Router,
  private boardService:BoardService){}
ngOnInit() {

   this.boardService.getBoardId(this.route.snapshot.paramMap.get('id')).subscribe((data)=>{
this.board = data
  }, (error)=>{
    console.log(error)
  })
console.log(this.board)
}
}
