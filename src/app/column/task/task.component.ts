import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from 'src/app/boards/delete-dialog/delete-dialog.component';
import { TaskService } from 'src/app/shared/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'src/app/shared/interfaces/column.interface';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  trash: any = faTrash;
  boardId!: string;
  @Input() column: Column | null | undefined = null;
  myData = {
    title: '',
    description: '',
  };
  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id') || '';
  }
  deleteTask(task: Task) {
    Dialog.confirm(this.dialog, async () => {
      this.taskService
        .deleteTask(this.boardId, this.column?._id, task._id)
        .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }
  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      height: '200px',
      data: { title: '', description: '' },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.myData.title = result.title;
      this.myData.description = result.description;
      this.task = {
        title: this.myData.title,
        description: this.myData.description,
        order: 0,
        userId: this.authService.getUserId(),
        users: [],
        boardId: this.boardId,
        columnId: this.column?._id,
         _id:task._id
      };


    this.taskService.editTask(this.task).subscribe((data)=>{
      console.log(data)
    }, (error)=>{
      console.log(error)
    } )
    });
  }
}
