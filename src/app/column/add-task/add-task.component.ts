import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskService } from 'src/app/shared/services/task.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'src/app/shared/interfaces/column.interface';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{
 myData ={
  title:'',
  description:''
 }
task:any = this.taskService.task;
order: number = 0;
boardId: string = "";
@Input() column: Column | null | undefined = null;
  constructor(
    public dialog: MatDialog,
    private taskService:TaskService,
    private authService: AuthService,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id') || "";
  }

  openDialog(column:any): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      height: '200px',
      data: { title: '', description:'' },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.myData.title = result.title;
this.myData.description = result.description
      this.task= { title:this.myData.title,
        description: this.myData.description,
        order: 0,
        userId: this.authService.getUserId(),
        users: [],
      boardId:this.boardId,
    columnId:column._id};
    console.log(column._id)

      this.taskService.createTask(this.task).subscribe(
        (data) => {
          console.log(data.columnId);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
