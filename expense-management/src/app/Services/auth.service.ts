import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7001';
  private loginStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  loginstatus$ = this.loginStatusSubject.asObservable();
  constructor( private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/login`, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loginStatusSubject.next(true);
        }
      })
    );
  }

  hasToken() : boolean {
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.loginStatusSubject.next(false);
  }

  getToken(): string|null {
    return localStorage.getItem('token');
  }

  getUserRole() : string | null{
    const token = this.getToken();
    if(!token) return null;

    const payload = atob(token.split('.')[1]);
    const parsedpayload = JSON.parse(payload);
    return parsedpayload.Role;
  }
}
