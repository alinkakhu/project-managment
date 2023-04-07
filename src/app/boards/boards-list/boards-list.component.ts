import { Component, Input, OnInit } from '@angular/core';
import { Board, BoardTitle } from 'src/app/shared/interfaces/board.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';
 import { BoardService } from 'src/app/shared/services/board.service';
@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent implements OnInit {
  boards!:Board[]

constructor(private userService:UserService, private authService:AuthService, private boaedService:BoardService){

}
ngOnInit(): void {
 this.boaedService.getBoards().subscribe((data)=>{
  this.boards = data;
  console.log(data)
 }, (error)=>{
  console.log(error);
 }
 )

}

}
