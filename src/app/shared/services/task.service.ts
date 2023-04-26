import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { Task } from '../interfaces/task.interface';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks:any= []
  task!:any
  constructor(private http:HttpClient, private authService:AuthService) { }
  getTasks(boardId: string | undefined): Observable<Task[]> {
    const url = `http://localhost:4402/tasksSet/${boardId}`;
    return this.http.get<Task[]>(url,
      {
        headers: {
        "Authorization": "Bearer " + this.authService.getToken()
    }});
  }

  createTask(task: Task): Observable<Task> {
    const { title, description, order, users, userId, boardId, columnId } = task;
    const url = `http://localhost:4402/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.post<Task>(url, { title, description, order, users, userId },
      {
        headers: {
        "Authorization": "Bearer " + this.authService.getToken()
    }}
      );
  }
  getTaskById(
    boardId: string | undefined,
    columnId: string | undefined

  ): Observable<unknown> {
    const url = `http://localhost:4402/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.get<unknown>(url,
      {
        headers: {
        "Authorization": "Bearer " + this.authService.getToken()
    }});
  }

  deleteTask(boardId: string | undefined | null, columnId: string | undefined | null, taskId: string | undefined) {
    const url = `http://localhost:4402/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http.delete<Task>(url,
      {
        headers: {
        "Authorization": "Bearer " + this.authService.getToken()
    }});
  }

 editTask(task: Task): Observable<Task> {
    const { title, description, order, users, userId, boardId, columnId, _id } = task;
    const url = `http://localhost:4402/boards/${boardId}/columns/${columnId}/tasks/${_id}`;
    return this.http.put<Task>(url, {
      title,
      order,
      description,
      userId,
      columnId,
      users,
    },
    {
      headers: {

        "Authorization": "Bearer " + this.authService.getToken()
    }} );
  }
  private _listeners = new Subject<any>();
  listen(): Observable<any>{
return this._listeners.asObservable()
  }
  filter(filterBy:any){
this._listeners.next(filterBy)
  }

}
