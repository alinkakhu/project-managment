import { ColumnService } from 'src/app/shared/services/column.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'src/app/shared/interfaces/column.interface';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-column-list',
  templateUrl: './column-list.component.html',
  styleUrls: ['./column-list.component.css'],
})
export class ColumnListComponent implements OnInit {
  title: string = '';
  order: number = 0;
  boardId: string = '';
  board: any = {};
  columns: Column[] = [];
  requestObj: any = [];

  constructor(
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    const lang = this.authService.getLang();
    this.translate.use(lang!);
    this.boardId = this.route.snapshot.paramMap.get('id') || '';
    this.columnService.getColumns(this.boardId).subscribe(
      (data) => {
        this.columns = data.sort((a, b) => a.order - b.order);
      },
      (error) => {}
    );
  }

  updateData(data: any) {
    this.columns = data;
  }

  drop(event: CdkDragDrop<Column[]>) {
    let orderStart = 0;
    if (event.previousContainer === event.container) {
      moveItemInArray(this.columns, event.previousIndex, event.currentIndex);

      this.columns.forEach((col) => {
        col.order = orderStart++;
        this.http
          .patch(
            'http://localhost:4402/columnsSet',
            [{ _id: col._id, order: col.order }],
            {
              headers: {
                Authorization: 'Bearer ' + this.authService.getToken(),
              },
            }
          )
          .subscribe(
            (data) => {},
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
    }
  }
}
