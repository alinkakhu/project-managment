import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const login = form.value.login;
    const password = form.value.password;

    this.authService.signup(login, password, name).subscribe(
      (resData) => {console.log(resData)},
      (error) => console.log(error)
    );
  }
}
