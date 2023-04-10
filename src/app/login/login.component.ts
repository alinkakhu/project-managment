import { Component } from '@angular/core';

import { AuthService, User } from '../auth/auth.service';

import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
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
        this.router.navigate(['/boards']);
        this.userService.getUsers().subscribe((data) => {
          const users = data;
          const user: User = users.filter((user) => user.login === login)[0];
          const userId: string = user._id!;
          const name = user.name
          localStorage.setItem('id', userId);
          localStorage.setItem('name', name);
        });
      });
  }
}
// .pipe(
//   catchError((error) => {
//     return throwError(() => new Error(error));
//   })
// )