import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdatepasswordService {
  private apiUrl = 'https://localhost:7001';
  constructor( private http: HttpClient) { }

  update(email: string, newPassword:string, currentpassword: string):Observable<any>{

    return this.http.post<any>(`${this.apiUrl}/Auth/update`, {email, newPassword, currentpassword})
    
  }


  
}

