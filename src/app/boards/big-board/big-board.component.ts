import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from 'src/app/shared/services/board.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
@Component({
  selector: 'app-big-board',
  templateUrl: './big-board.component.html',
  styleUrls: ['./big-board.component.css'],
})
export class BigBoardComponent implements OnInit {
  board!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    public translate: TranslateService,
    private langService: LanguageService
  ) {}
  ngOnInit() {
    this.langService.localEvent.subscribe((locale) =>
      this.translate.use(locale)
    );
    this.boardService
      .getBoardId(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (data) => {
          this.board = data;
        },
        (error) => {}
      );
  }
}
