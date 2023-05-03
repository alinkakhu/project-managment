import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router){}


  canActivate(): boolean | UrlTree {

    console.log('AuthStateGuard has run');

    if (!this.authService.isLoggedIn()) return true;

    return this.router.parseUrl('dash');
  }
}
