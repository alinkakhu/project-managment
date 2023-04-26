import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './column/column.component';
import { ColumnListComponent } from './column-list/column-list.component';
import { AddColumnBtnComponent } from './add-column-btn/add-column-btn.component';
import { ColumnDialogComponent } from './column-dialog/column-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteColumnComponent } from './delete-column/delete-column.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    ColumnComponent,
    ColumnListComponent,
    AddColumnBtnComponent,
    ColumnDialogComponent,
    DeleteColumnComponent,
    TaskComponent,
    TaskListComponent,
    AddTaskComponent,
    TaskDialogComponent,
    TaskDeleteComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    FontAwesomeModule,
    DragDropModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })

  ],
  exports:[ColumnListComponent]
})
export class ColumnModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(  http, '../../assets/i18n/', '.json');
}