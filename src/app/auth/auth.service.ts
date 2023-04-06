import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id?: string;
  name: string;
  login: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    authlogin:string = '';
  constructor(private http: HttpClient) {}
  signup(login: string, password: string, name: string): Observable<unknown> {
    return this.http.post('http://localhost:4402/auth/signup', {
      login: login,
      password: password,
      name: name,
    });
  }
  login(login: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      'http://localhost:4402/auth/signin',
      {
        login,
        password,
      }
    );
  }

  isLoggedIn() {
    return localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
}

}
