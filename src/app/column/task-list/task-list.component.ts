import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { Column } from 'src/app/shared/interfaces/column.interface';
import {
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
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
    taskService.listen().subscribe((m: any) => {
      this.boardId = this.route.snapshot.paramMap.get('id') || '';

      this.taskService.getTaskById(this.boardId, this.column._id).subscribe(
        (data: any) => {
          this.taskList = data;
          // .sort((a: any, b: any) => a.order - b.order);
        },
        (error) => {}
      );
    });
  }
  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id') || '';
    this.taskService.getTaskById(this.boardId, this.column._id).subscribe(
      (data: any) => {
        this.taskList = data;
        // .sort((a: any, b: any) => a.order - b.order);
      },
      (error) => {}
    );
  }

  drop(event: any) {
    const draggedTask = event.previousContainer.data[0];
    const draggedCol = event.container.data;
    let orderStart = 0;
    if (event.previousContainer === event.container) {
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
            (data) => {},
            (error) => {}
          );
      });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.taskService
        .deleteTask(this.boardId, draggedTask.columnId, draggedTask._id)
        .pipe(take(1))
        .subscribe(
          (data) => {},
          (error) => {}
        );

      this.taskService
        .createTask({
          title: draggedTask.title,
          order: draggedTask.order,
          description: draggedTask.description,
          userId: draggedTask.userId,
          boardId: draggedTask.boardId,
          columnId: this.column._id,
          users: [],
        })
        .subscribe(
          (data) => {},
          (error) => {}
        );
    }
  }
  updateData(data: any) {
    this.taskList = data;
  }
}
