import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private userService:UserService) {
    {
    }
  }
  onSubmit(form: NgForm) {
    const login = form.value.login;
    const password = form.value.password;
this.authService.authlogin = login
    this.authService
      .login(login, password)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      )
      .subscribe((resData) => {
        localStorage.setItem('token', resData.token);
        localStorage.setItem('login', login);
        this.router.navigate(['/boards']);
       this.userService.getUsers().subscribe((data)=>{
        const users=data
        console.log(users)
       const user = users.filter((user)=>user.login === login)[0]
       console.log(user)
       localStorage.setItem('id', user._id);
       })

      });

  }
}
