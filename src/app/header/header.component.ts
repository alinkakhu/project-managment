import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

constructor(private auth:AuthService, private router:Router){

}

ngOnInit(): void {

}
isLogged(){
  return !!this.auth.isLoggedIn()

  }

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/welcome-page'])
}
}
