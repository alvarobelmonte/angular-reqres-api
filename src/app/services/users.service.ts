import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  login(user: Object): Observable<any> {
    return this.http.post('https://reqres.in/api/login', user);
  }
  getUsers(page: Number): Observable<any> {
    const tokenData: any = this.getToken();
    const { token } = JSON.parse(tokenData);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get(`https://reqres.in/api/users?page=${page}`, {
      headers,
    });
  }

  setToken(token: String) {
    localStorage.setItem('token', JSON.stringify({ token }));
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token')!;
    return token ? true : false;
  }
}
