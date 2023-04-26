import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

import { LoginComponent } from './login/login.component';
import { FormsModule} from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './footer/footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LanguageSwitcherComponent } from './shared/language-switcher/language-switcher.component';

import { BoardModule } from './boards/board.module';
@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
HeaderComponent,
LanguageSwitcherComponent,
    LoginComponent,
    RegistrationComponent,
    EditProfileComponent,
    FooterComponent




  ],
  imports: [
    BrowserModule,
    HttpClientModule,
AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BoardModule,
    FontAwesomeModule,
ReactiveFormsModule,
BoardModule,

TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: httpTranslateLoader,
    deps: [HttpClient]
  }
})








  ],
  exports: [LoginComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
