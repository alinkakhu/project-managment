import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  constructor(private authService: AuthService) {}

registerForm= new FormGroup({
name: new FormControl('',  [
  Validators.required,
  Validators.minLength(2),
  Validators.maxLength(20),
  Validators.pattern('^[a-zA-Z].*')
]),
login: new FormControl('',  [
  Validators.required,
  Validators.minLength(2),
  Validators.pattern('^[a-zA-Z0-9]+$'),
]),
password: new FormControl('',[
  Validators.required,
  Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
])

})
get getName():FormControl{
return this.registerForm.get('name') as FormControl
}
get getLogin():FormControl{
  return this.registerForm.get('login') as FormControl
  }
  get getPassword():FormControl{
    return this.registerForm.get('password') as FormControl
    }
  onSubmit() {

    const { name, login, password } = this.registerForm.value;

    this.authService.signup(login, password, name).subscribe(
      (resData) => {console.log(resData)},
      (error) => console.log(error)
    );
  }
}
