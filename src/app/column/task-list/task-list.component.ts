import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { Column } from 'src/app/shared/interfaces/column.interface';
import {
  CdkDragDrop,

  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  taskList!: any;
  boardId!: any;
  @Input() column!: Column;
  constructor(
    private taskService: TaskService,

    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient
  ) {

    taskService.listen().subscribe((m:any)=>{


      this.boardId = this.route.snapshot.paramMap.get('id') || '';

      this.taskService.getTaskById(this.boardId, this.column._id).subscribe(
        (data: any) => {
          this.taskList = data
          // .sort((a: any, b: any) => a.order - b.order);
        },
        (error) => {
          console.log(error);
        }
      );

    })
  }
  ngOnInit(): void {

    this.boardId = this.route.snapshot.paramMap.get('id') || '';

    this.taskService.getTaskById(this.boardId, this.column._id).subscribe(
      (data: any) => {
        this.taskList = data
        // .sort((a: any, b: any) => a.order - b.order);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  drop(event: CdkDragDrop<Task[]>) {
    const draggedTask = event.previousContainer.data[0];

    const draggedCol = event.container.data;

    let orderStart = 0;
    if (event.previousContainer === event.container) {
      console.log('kol');
      moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);

      this.taskList.forEach((task: any) => {
        task.order = orderStart++;
        console.log(task._id);
        this.http
          .patch(
            'http://localhost:4402/tasksSet',
            [{ _id: task._id, order: task.order, columnId: task.columnId }],
            {
              headers: {
                Authorization: 'Bearer ' + this.authService.getToken(),
              },
            }
          )
          .subscribe(
            (data) => {
              console.log('task', data);
            },
            (error) => {
              console.log(error);
            }
          );
      });
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event)
      this.taskService
      .deleteTask(this.boardId, draggedTask.columnId, draggedTask._id)
      .subscribe(
        (data) => {


        },
        (error) => {
          console.log(error);
        }
      );

      this.taskService.createTask({
        title: draggedTask.title,
        order: draggedTask.order,
        description: draggedTask.description,
        userId: draggedTask.userId,
        boardId: draggedTask.boardId,
        columnId: this.column._id,
        users: [],
      }).subscribe((data) => {},(error) => {console.log(error);});




      //  _id?: string;
      //  title: string;
      //  order: number;
      //  description: string;
      //  userId: string | undefined | null;
      //  boardId: string;
      //  columnId: string | undefined | null;
      //  users: string[];
    }
  }
  updateData(data:any){
    this.taskList= data
  }
}
