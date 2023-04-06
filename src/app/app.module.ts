import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { BoardsListComponent } from './boards/boards-list/boards-list.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HeaderComponent,
    ButtonComponent,
    LoginComponent,
    RegistrationComponent,
    BoardsListComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
AppRoutingModule,
    FormsModule


  ],
  exports: [LoginComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
