import { Component } from '@angular/core';
import { AuthService, User } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
  constructor(private http:HttpClient, private authService:AuthService){}


}
