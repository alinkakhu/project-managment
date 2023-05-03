import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskService } from 'src/app/shared/services/task.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'src/app/shared/interfaces/column.interface';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  myData = {
    title: '',
    description: '',
  };
  task: any = this.taskService.task;
  order: number = 0;
  boardId: string = '';
  @Output() addTask = new EventEmitter();
  @Input() column: Column | null | undefined = null;
  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private langService: LanguageService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.langService.localEvent.subscribe((locale) =>
      this.translate.use(locale)
    );
    this.boardId = this.route.snapshot.paramMap.get('id') || '';
  }

  openDialog(column: any): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '320px',
      height: '300px',
      data: { title: '', description: '' },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.myData.title = result.title;
      this.myData.description = result.description;
      this.task = {
        title: this.myData.title,
        description: this.myData.description,
        order: 0,
        userId: this.authService.getUserId(),
        users: [],
        boardId: this.boardId,
        columnId: column._id,
      };
      this.taskService.createTask(this.task).subscribe(
        (data) => {
          this.taskService
            .getTaskById(this.boardId, this.column?._id)
            .subscribe((data) => this.taskService.filter(data));
        },
        (error) => {}
      );
    });
  }
}
