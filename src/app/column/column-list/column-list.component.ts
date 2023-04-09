
import { ColumnService } from 'src/app/shared/services/column.service';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'src/app/shared/interfaces/column.interface';
@Component({
  selector: 'app-column-list',
  templateUrl: './column-list.component.html',
  styleUrls: ['./column-list.component.css']
})
export class ColumnListComponent implements OnInit {
  title: string = "";
  order: number = 0;
  boardId: string = "";
  board: any = {};
  columns!: Column[]
  constructor(private columnService:ColumnService,
    private router:Router,
    private route:ActivatedRoute){}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id') || "";
  this.columnService.getColumns(this.boardId).subscribe((data)=>{
     this.columns = data
    }, (error)=>{console.log(error)})
  }

// createColumn(){
// const column ={
//   title: 'New column',
//   order: this.order,
//   boardId:this.boardId
// }
// this.columnService.createColumn(column).subscribe((data)=>{
//   console.log(data)
// }, (error)=>{console.log(error)})
// }
}
