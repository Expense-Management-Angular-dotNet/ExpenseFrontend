import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLogin = localStorage.getItem('isLogin') === 'true';

  if (isLogin) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};