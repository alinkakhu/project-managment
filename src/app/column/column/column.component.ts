import { Component, Input, OnInit} from '@angular/core';
import { Column } from 'src/app/shared/interfaces/column.interface';
import { NgForm } from '@angular/forms';
import { ColumnService } from 'src/app/shared/services/column.service';
import { faXmark, faCheck, faTrash} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from 'src/app/boards/delete-dialog/delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {
@Input() column!:Column
inputVisible: boolean = false;
xmark:any = faXmark
check:any = faCheck
trash:any = faTrash;
boardId: string = "";
constructor(private columnService:ColumnService, private dialog:MatDialog, private route:ActivatedRoute){

}
ngOnInit(): void {
  this.boardId = this.route.snapshot.paramMap.get('id') || "";
  console.log(this.column)
}
onSubmit(form:NgForm){
  const { title } = form.value;
  const { _id, boardId, order } = this.column!;
  this.column= { title, order, _id, boardId }

  this.columnService.updateColumn(this.column).subscribe((data)=>{
    console.log(data._id)
  }, (error)=>{
    console.log(error)
  })
  this.inputVisible = false;

}
updateTitle() {
  this.inputVisible = true;

}

cancel() {
  this.inputVisible = false;
}
deleteColumn(column:any){
  Dialog.confirm(this.dialog, async () => {
    this.columnService.deleteColumn(this.boardId, column._id).subscribe((data)=>{
      console.log(data)
    },
    (error)=>{
      console.log(error)
    } );
  })

}
}
