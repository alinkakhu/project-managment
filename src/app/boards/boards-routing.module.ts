import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { BigBoardComponent } from './big-board/big-board.component';

const routes: Routes = [
  { path: '', component: BoardsListComponent },
  { path: ':id', component: BigBoardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}