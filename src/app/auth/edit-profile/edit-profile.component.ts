import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Dialog } from 'src/app/boards/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  user!: User;
  id!: string | null;
  isUpdated: boolean = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog:MatDialog,
    private router: Router
  ) {}

  editForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z].*'),
    ]),
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
    ]),
  });
  ngOnInit(): void {
    this.setValue();
    this.id = this.authService.getUserId();
  }

  get getName(): FormControl {
    return this.editForm.get('name') as FormControl;
  }
  get getLogin(): FormControl {
    return this.editForm.get('login') as FormControl;
  }
  get getPassword(): FormControl {
    return this.editForm.get('password') as FormControl;
  }

  setValue() {
    this.editForm.patchValue({
      name: this.authService.getName(),
      login: this.authService.getLogin(),
    });
  }

  onSubmit() {
    const { name, login, password } = this.editForm.value;
    const id = this.id;
    console.log(id);
    this.userService.updateUser({ id, name, login, password }).subscribe(
      (data) => {
        console.log(data);
        this.isUpdated = true;
        localStorage.setItem('login', data.login);
        localStorage.setItem('name', data.name);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDialog() {
    Dialog.confirm(this.dialog, async () => {
      const id = this.id;
       this.userService.deleteUser(id).subscribe(
       (data) => {
           console.log('user deleted');
           this.authService.logout()
           this.router.navigate(['/welcome-page'])
       },
        (error) => {
          console.log(error);
       }
      );
     });
  }
}
