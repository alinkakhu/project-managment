import { Component, OnInit ,Input} from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { Column } from 'src/app/shared/interfaces/column.interface';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
taskList!:any
boardId!:any;
@Input() column!:Column
constructor(private taskService:TaskService,
  private router:Router,
  private route:ActivatedRoute){

}
ngOnInit(): void {
  this.boardId = this.route.snapshot.paramMap.get('id') || "";
  console.log(this.boardId)
  this.taskService.getTaskById(this.boardId,this.column._id).subscribe((data)=>{
     this.taskList = data
    }, (error)=>{console.log(error)})
}
}
