import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { BoardService } from '../shared/services/board.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: any = this.getName();
  boards: any = this.boardsService.boards;
  constructor(
    private auth: AuthService,
    private router: Router,
    public translate: TranslateService,
    private boardsService: BoardService
  ) {}

  ngOnInit(): void {}
  isLogged() {
    return !!this.auth.isLoggedIn();
  }
  getName() {
    return localStorage.getItem('name');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('id');
    this.router.navigate(['/welcome-page']);
  }
}
