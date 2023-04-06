import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent implements OnInit {


constructor(private userService:UserService, private authService:AuthService){

}
ngOnInit(): void {

}

}
