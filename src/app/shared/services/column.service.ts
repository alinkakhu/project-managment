import { Injectable } from '@angular/core';
import { Column } from '../interfaces/column.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  column!: any;

  constructor(private http: HttpClient, private authService: AuthService) {}
  getColumns(boardId: string | undefined): Observable<Column[]> {
    const url = `http://localhost:4402/boards/${boardId}/columns`;
    return this.http.get<Column[]>(url, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
      },
    });
  }
  createColumn(column: Column): Observable<Column> {
    const { boardId, title, order } = column;
    const url = `http://localhost:4402/boards/${boardId}/columns`;
    return this.http.post<Column>(
      url,
      { title, order },
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.getToken(),
        },
      }
    );
  }
  updateColumn(column: Column) {
    const { boardId, _id, title, order } = column;
    const url = `http://localhost:4402/boards/${boardId}/columns/${_id}`;
    return this.http.put<Column>(
      url,
      {
        title,
        order,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.getToken(),
        },
      }
    );
  }

  deleteColumn(
    boardId: string | undefined,
    columnId: string | undefined
  ): Observable<Column> {
    const url = `http://localhost:4402/boards/${boardId}/columns/${columnId}`;
    return this.http.delete<Column>(url, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
      },
    });
  }
}
