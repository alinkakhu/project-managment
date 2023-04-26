import { Component } from '@angular/core';

import { AuthService, User } from '../auth/auth.service';

import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardService } from '../shared/services/board.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error:any

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private boaedService:BoardService
  ) {
  }
 loginForm= new FormGroup({

    login: new FormControl('',  [
      Validators.required

    ]),
    password: new FormControl('',[
      Validators.required,

    ])

    })

    get getLogin():FormControl{
      return this.loginForm.get('login') as FormControl
      }

      get getPassword():FormControl{
        return this.loginForm.get('password') as FormControl
        }
  onSubmit() {
    const { login, password } = this.loginForm.value;
    this.authService
      .login(login, password).subscribe((resData) => {
        localStorage.setItem('token', resData.token);
        localStorage.setItem('login', login!);


        this.userService.getUsers().subscribe((data) => {
          const users = data;
          const user: User = users.filter((user) => user.login === login)[0];
          const userId: string = user._id!;
          const name = user.name
          localStorage.setItem('id', userId);
          localStorage.setItem('name', name);

          this.boaedService.getBoards(userId)
          this.router.navigate(['/boards']);
        });

      }, (error)=>{
        console.log(error)
        this.error = error.error.message
      });

  }
  close(){

    this.error = ''
  }
}
// .pipe(
//   catchError((error) => {
//     return throwError(() => new Error(error));
//   })
// )