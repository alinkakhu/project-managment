import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Subject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
localEvent = new Subject<string>
  constructor(private translate:TranslateService) { }
  changeLocale(locale:string){
this.translate.use(locale)
this.localEvent.next(locale)
  }
}
