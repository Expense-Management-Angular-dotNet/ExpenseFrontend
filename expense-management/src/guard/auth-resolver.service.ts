import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<void> {
  constructor(private router: Router) {}

  resolve(): void {
    const isLogin = localStorage.getItem('isLogin') === 'true';
    if (isLogin) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
