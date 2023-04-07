import { Injectable } from '@angular/core';
import { Board, BoardTitle } from '../interfaces/board.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boards:Board[]= [{
    title:'Project'
    }]
    board!:BoardTitle
  constructor(private http:HttpClient, private authService:AuthService) { }
  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>('http://localhost:4402/boards', {
      headers: {
      "Authorization": "Bearer " + this.authService.getToken()
  }} );
  }
  createBoard(board: BoardTitle): Observable<BoardTitle> {
    return this.http.post<BoardTitle>('http://localhost:4402/boards', board,
    {
      headers: {
      "Authorization": "Bearer " + this.authService.getToken()
  },
});
  }
}
