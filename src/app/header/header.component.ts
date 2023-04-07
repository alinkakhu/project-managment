import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { BoardService } from '../shared/services/board.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {}
  isLogged() {
    return !!this.auth.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('id');
    this.router.navigate(['/welcome-page']);
  }

}
