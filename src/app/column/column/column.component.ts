import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Column } from 'src/app/shared/interfaces/column.interface';
import { NgForm } from '@angular/forms';
import { ColumnService } from 'src/app/shared/services/column.service';
import { faXmark, faCheck, faTrash} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from 'src/app/boards/delete-dialog/delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, CdkDragMove, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/interfaces/task.interface';
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {
@Input() column!:Column
@Output() deleteEvent = new EventEmitter()
inputVisible: boolean = false;
xmark:any = faXmark
check:any = faCheck
trash:any = faTrash;
boardId: string = "";
taskList:any;

constructor(private columnService:ColumnService, private dialog:MatDialog, private route:ActivatedRoute, private taskService:TaskService){

}
ngOnInit(): void {
  this.boardId = this.route.snapshot.paramMap.get('id') || "";
  this.taskService.getTaskById(this.boardId,this.column._id).subscribe((data)=>{
    this.taskList = data
   }, (error)=>{console.log(error)})

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
      this.columnService.getColumns(this.boardId).subscribe((data)=> this.deleteEvent.emit(data))
    },
    (error)=>{
      console.log(error)
    } );
  })

}

}
