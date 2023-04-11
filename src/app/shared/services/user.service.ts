import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService:AuthService) {}
  getUsers():Observable<User[]> {
   return this.http.get<User[]>('http://localhost:4402/users',{
    headers: {
    "Authorization": "Bearer " + this.authService.getToken()
}});
  }
  getUserById(id: string | undefined): Observable<User> {
    return this.http.get<User>(`http://localhost:4402/users/${id}`,  {
      headers: {
      "Authorization": "Bearer " + this.authService.getToken()
  },});
  }
  updateUser(user: any): Observable<User> {
    const { login, name, password } = user;
    return this.http.put<User>(`http://localhost:4402/users/${user.id}`, {
      login,
      name,
      password,
    }, {
      headers: {
      "Authorization": "Bearer " + this.authService.getToken()
  },});
  }

  deleteUser(id: string | null): Observable<User> {
    const url = `http://localhost:4402/users/${id}`;
    return this.http.delete<User>(url, {
      headers: {
      "Authorization": "Bearer " + this.authService.getToken()
  },}) ;
  }


}
