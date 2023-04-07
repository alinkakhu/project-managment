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
import { BoardComponent } from './boards/board/board.component';
import { CreateBoardBtnComponent } from './boards/create-board-btn/create-board-btn.component';
import { DialogComponent } from './boards/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HeaderComponent,
    ButtonComponent,
    LoginComponent,
    RegistrationComponent,
    BoardsListComponent,
    BoardComponent,
    CreateBoardBtnComponent,
    DialogComponent,

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
    MatInputModule


  ],
  exports: [LoginComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
