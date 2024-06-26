import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../app/Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authservice = inject(AuthService);

  if(authservice.hasToken()){
    return true;
  }else {
    router.navigate(['/login']);
    return false;
  }
};
