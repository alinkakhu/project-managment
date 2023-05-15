import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css'],
})
export class LanguageSwitcherComponent {
  constructor(
    public translate: TranslateService,
    private langService: LanguageService
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }
  switchLang(lang: string) {
    this.langService.changeLocale(lang);
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}
