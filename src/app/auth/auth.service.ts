import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private role = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    window.onbeforeunload = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
    };
  }


  signup(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/signup`, { email, password });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      map((res:any)=>{
        return res;
      })
    )
  }

  async saveToken(token: string) {
    await localStorage.setItem('access_token', token);

  }

  async getToken() {
    return await localStorage.getItem('access_token');
  }
  saveRole(role: string) {
    this.role.next(role);
    localStorage.setItem('role', role);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  async logout() {
    await localStorage.removeItem("access_token");
    localStorage.removeItem('role')
    this.router.navigate(['/login']);
    this.role.next(null)
  }
}
