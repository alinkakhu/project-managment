import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { BoardService } from 'src/app/shared/services/board.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css'],
})
export class BoardsListComponent implements OnInit {
  boards!: any[];
  users: any[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private boaedService: BoardService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    boaedService.listen().subscribe((m: any) => {
      console.log(m);
      this.boards.push(m);
    });
  }
  async ngOnInit() {
    const lang = this.authService.getLang();
    this.translate.use(lang!);
    const id = this.authService.getUserId();
    this.boaedService.getBoards(id).subscribe(
      (data) => {
        this.boards = data;
        this.userService.getUsers().subscribe((data) => {
          this.users = data;
        });
        for (let board of this.boards) {
          board.user = null;
        }
      },
      (error) => {}
    );
  }
  updateData(data: any) {
    this.boards = data;
  }
}
