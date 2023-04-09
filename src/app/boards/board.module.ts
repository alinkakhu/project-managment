import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { BigBoardComponent } from './big-board/big-board.component';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { CreateBoardBtnComponent } from './create-board-btn/create-board-btn.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DialogComponent } from './dialog/dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BoardsRoutingModule } from './boards-routing.module';
import { ColumnModule } from '../column/column.module';
@NgModule({
  declarations: [
    BoardComponent,
    BigBoardComponent,
    BoardsListComponent,
    CreateBoardBtnComponent,
    DeleteDialogComponent,
    DialogComponent

  ],
  imports: [
    CommonModule,
BoardsRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterModule,
    ColumnModule

  ],
  exports:[ CreateBoardBtnComponent]
})
export class BoardModule { }